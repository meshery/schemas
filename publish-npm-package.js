const fs = require("fs");
const path = require("path");
// for building and release the package

// bump version
const bump = (version) => {
  const packagePath = path.resolve(__dirname, "package.json");
  const package = require(packagePath);
  package.version = version;
  fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
  console.log("bumped version to " + version);
};

// build
const build = () => {
  const execSync = require("child_process").execSync;
  execSync("npm run build ", { stdio: [0, 1, 2] });
  console.log("built typscript files");
};

const publish = () => {
  // publish to npm
  const execSync = require("child_process").execSync;
  execSync("npm publish --verbose", { stdio: [0, 1, 2] });
  console.log("published to npm");
};

// main
const main = () => {
  const args = process.argv.slice(2);
  const version = args[0];
  if (!version) {
    console.error("version is required");
    process.exit(1);
  }
  try {
    bump(version);
    build();
    publish();
    console.log("done");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
