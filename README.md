# Meshery Schemas

## Permissions Key Generation (Two-Phase)

- Phase 1: Generate a hash-identified permissions index from CSV and save under `permissions_history/<hash>-permissions_index.json`. Hash is SHA-256 of all name+uuid pairs (feature ignored).
- Phase 2: Generate code files (TypeScript and Go) from that index and embed the index id constant in outputs.

### Commands

- TypeScript permission keys: `npm run generate:permissions:ts`
- Go permission keys: `npm run generate:permissions:go`
- Diff two permission indexes: `npm run diff:permissions -- permissions_history/old-index.json permissions_history/new-index.json`
- Apply updated renames from diff: `npm run apply:permissions -- permissions_history/diff.json --path <dir> [--dry]`

### Notes

- Keys are immutable UUIDs; names can change, and keys can be deprecated.
- Index files let clients track changes and plan migrations using the diff utility.
- Do not commit generated code under `models/`, `typescript/generated/`, or `dist/`. Index files under `permissions_history/` should be versioned.
