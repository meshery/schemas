const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const config = require("../build/lib/config");
const paths = require("../build/lib/paths");
const {
  MANIFEST_FILENAME,
  dependencyTableLines,
  generatedFileDigests,
  generatedHeader,
  getPilotPackages,
  listFiles,
  lockedVersions,
  missingDependencyLines,
  parseToolchainChannel,
  specDigest,
} = require("../build/generate-rust");

const crateRoot = paths.fromRoot(config.paths.rustDir);
const readRoot = (...segments) => fs.readFileSync(paths.fromRoot(...segments), "utf-8");

test("parseToolchainChannel accepts only an exact x.y.z release", () => {
  assert.equal(parseToolchainChannel('[toolchain]\nchannel = "1.99.1"\n'), "1.99.1");
  assert.throws(() => parseToolchainChannel('[toolchain]\nchannel = "stable"\n'), /exact release/);
  assert.throws(() => parseToolchainChannel('[toolchain]\nchannel = "1.99"\n'), /exact release/);
  assert.throws(() => parseToolchainChannel("[toolchain]\n"), /no \[toolchain\] channel/);
});

test("lockedVersions reads one package's versions from a Cargo.lock", () => {
  const lock = [
    "version = 4",
    "",
    "[[package]]",
    'name = "progenitor"',
    'version = "0.17.0"',
    "",
    "[[package]]",
    'name = "progenitor-impl"',
    'version = "0.17.0"',
    "",
  ].join("\n");

  assert.deepEqual(lockedVersions(lock, "progenitor"), ["0.17.0"]);
  assert.deepEqual(lockedVersions(lock, "missing"), []);
});

test("missingDependencyLines compares [dependencies] lines verbatim", () => {
  const cargoToml = [
    "[package]",
    'name = "x"',
    "",
    "[dependencies]",
    "# a comment",
    'serde = { version = "1.0", features = ["derive"] }',
    "",
    "[dev-dependencies]",
    'uuid = { version = "1.0", features = ["serde"] }',
  ].join("\n");

  assert.deepEqual(dependencyTableLines(cargoToml), ['serde = { version = "1.0", features = ["derive"] }']);
  assert.deepEqual(missingDependencyLines(['serde = { version = "1.0", features = ["derive"] }'], cargoToml), []);
  // A dev-dependency does not satisfy a dependency, and a changed requirement is a miss.
  assert.deepEqual(missingDependencyLines(['uuid = { version = "1.0", features = ["serde"] }'], cargoToml), [
    'uuid = { version = "1.0", features = ["serde"] }',
  ]);
  assert.deepEqual(missingDependencyLines(['serde = "1.0"'], cargoToml), ['serde = "1.0"']);
});

test("generatedHeader marks the file generated without rustfmt's @generated skip marker", () => {
  const header = generatedHeader("_openapi_build/constructs/v1beta2/key/merged-openapi.json");

  assert.match(header, /DO NOT EDIT\./);
  assert.match(header, /make generate-rust/);
  assert.doesNotMatch(header, /@generated/);
});

test("rust generator and toolchain pins are exact and agree with each other", () => {
  assert.equal(config.rust.generatorCrate, "progenitor");
  assert.match(config.rust.generatorVersion, /^\d+\.\d+\.\d+$/);

  const glueDeps = dependencyTableLines(readRoot(config.paths.rustGenDir, "Cargo.toml"));
  const pin = glueDeps.find((line) => line.startsWith("progenitor ="));
  assert.ok(pin && pin.includes(`"=${config.rust.generatorVersion}"`), `glue must pin progenitor =${config.rust.generatorVersion}`);

  const lock = readRoot(config.paths.rustGenDir, "Cargo.lock");
  assert.deepEqual(lockedVersions(lock, "progenitor"), [config.rust.generatorVersion]);
  assert.deepEqual(lockedVersions(lock, "progenitor-impl"), [config.rust.generatorVersion]);

  parseToolchainChannel(readRoot(config.paths.rustToolchainFile));
});

test("rust pilot constructs resolve through shared discovery and match the python pilot", () => {
  const pilot = getPilotPackages();

  assert.ok(pilot.length > 0);
  for (const pkg of pilot) {
    assert.ok(config.rust.pilotPackages.includes(`${pkg.version}/${pkg.dirName}`));
  }
  assert.deepEqual([...config.rust.pilotPackages].sort(), [...config.python.pilotPackages].sort());
});

test("committed rust output matches its manifest spec and generated-file digests", () => {
  const manifestPath = path.join(crateRoot, MANIFEST_FILENAME);
  assert.ok(
    paths.fileExists(manifestPath),
    `missing ${config.paths.rustDir}/${MANIFEST_FILENAME}; run 'make generate-rust' first`,
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  const pinHint = "committed rust manifest pins differ from build/lib/config.js or rust-toolchain.toml; run 'make generate-rust'";
  assert.equal(manifest.generator, config.rust.generatorCrate, pinHint);
  assert.equal(manifest.generatorVersion, config.rust.generatorVersion, pinHint);
  assert.equal(manifest.interface, config.rust.interface, pinHint);
  assert.equal(manifest.tags, config.rust.tags, pinHint);
  assert.equal(manifest.toolchain, parseToolchainChannel(readRoot(config.paths.rustToolchainFile)), pinHint);

  assert.deepEqual(Object.keys(manifest.specs).sort(), [...config.rust.pilotPackages].sort());
  for (const [key, entry] of Object.entries(manifest.specs)) {
    const specPath = paths.fromRoot(entry.spec);
    assert.ok(
      paths.fileExists(specPath),
      `bundled spec for ${key} not found at ${entry.spec}; run 'node build/bundle-openapi.js' first`,
    );
    assert.equal(
      specDigest(specPath),
      entry.sha256,
      `committed rust client for ${key} is stale (spec digest mismatch); run 'make generate-rust'`,
    );
  }

  const moduleDirs = getPilotPackages().map((pkg) => path.join(crateRoot, "src", pkg.name));
  assert.deepEqual(
    generatedFileDigests(crateRoot, moduleDirs),
    manifest.files,
    "committed generated rust files differ from the manifest digests (hand-edited or stale); run 'make generate-rust'",
  );
});

test("scaffold Cargo.toml declares every dependency the generated code needs", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(crateRoot, MANIFEST_FILENAME), "utf-8"));
  const cargoToml = fs.readFileSync(path.join(crateRoot, "Cargo.toml"), "utf-8");

  assert.match(cargoToml, new RegExp(`^name = "${config.rust.crateName}"$`, "m"));
  assert.match(cargoToml, new RegExp(`^name = "${config.rust.libName}"$`, "m"));
  for (const [key, lines] of Object.entries(manifest.dependencies)) {
    assert.deepEqual(
      missingDependencyLines(lines, cargoToml),
      [],
      `${config.paths.rustDir}/Cargo.toml is missing dependency lines the ${key} module needs`,
    );
  }
});

test("committed rust tree keeps scaffold/generated separation and no build output", () => {
  for (const pkg of getPilotPackages()) {
    const moduleDir = path.join(crateRoot, "src", pkg.name);
    assert.ok(
      paths.fileExists(path.join(moduleDir, "mod.rs")),
      `generated ${pkg.name} client is missing; run 'make generate-rust'`,
    );
    assert.ok(
      paths.fileExists(path.join(moduleDir, "types", "mod.rs")),
      `generated ${pkg.name} models are missing; run 'make generate-rust'`,
    );
    assert.match(
      fs.readFileSync(paths.fromRoot(config.paths.rustDir, "src", "lib.rs"), "utf-8"),
      new RegExp(`^pub mod ${pkg.name};$`, "m"),
      `src/lib.rs must declare the generated ${pkg.name} module`,
    );

    const header = generatedHeader(config.getBundledOutputPath(pkg));
    for (const relative of listFiles(crateRoot, [moduleDir])) {
      assert.match(relative, /\.rs$/, `only Rust sources belong in a generated module: ${relative}`);
      assert.ok(
        fs.readFileSync(path.join(crateRoot, relative), "utf-8").startsWith(header),
        `${relative} lacks the generated-file header; run 'make generate-rust'`,
      );
    }
  }

  // Hand-maintained scaffold files say so and never carry the generated header.
  for (const scaffold of ["Cargo.toml", path.join("src", "lib.rs")]) {
    const text = fs.readFileSync(path.join(crateRoot, scaffold), "utf-8");
    assert.match(text, /HAND-MAINTAINED SCAFFOLD/, `${scaffold} must be marked as hand-maintained`);
    assert.doesNotMatch(text, /DO NOT EDIT/, `${scaffold} must not carry the generated header`);
  }

  // Build output stays out of git; both lockfiles stay in.
  for (const target of [`${config.paths.rustDir}/target/`, `${config.paths.rustGenDir}/target/`]) {
    const ignored = spawnSync("git", ["check-ignore", "-q", target], { cwd: paths.getProjectRoot() });
    assert.equal(ignored.status, 0, `${target} must be git-ignored`);
  }
  for (const lock of [`${config.paths.rustDir}/Cargo.lock`, `${config.paths.rustGenDir}/Cargo.lock`]) {
    const ignored = spawnSync("git", ["check-ignore", "-q", lock], { cwd: paths.getProjectRoot() });
    assert.equal(ignored.status, 1, `${lock} must not be git-ignored`);
  }
});
