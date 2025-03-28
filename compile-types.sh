#!/usr/bin/env bash
# Check if both input and output directories are provided
if [ $# -ne 3 ]; then
  echo "Usage: $0 <input_directory> <output_directory> <output_directory_for_json_models>"
  exit 1
fi

INPUT_DIR=$(realpath "$1")
OUTPUT_DIR=$(realpath "$2")
OUTPUT_DIR_JSON=$(realpath "$3")


# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
  echo "Error: Input directory '$INPUT_DIR' does not exist."
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Create temporary directory for JSON files
TEMP_DIR="$OUTPUT_DIR/temp"
mkdir -p "$TEMP_DIR"

# Store the original directory
ORIGINAL_DIR=$(pwd)

# Function to convert to PascalCase with Schema suffix
to_pascal_case_schema() {
  echo "$1" | sed -E 's/[ -]+/_/g; s/(^|_)([a-z])/\U\2/g' | sed 's/_//g' | awk '{print $0 "Schema"}'
}

# Function to generate schema export file
generate_schema_export() {
  local output_file="$1"
  local relative_path="$2"
  local input_file="$3"

  {
    echo "// Generated from $relative_path"
    echo "// This file exports the original JSON schema"
    echo ""
    echo "const schema = $(cat "$input_file")"
    echo ""
    echo "export default schema;"
  } > "$output_file"
}

# Function to resolve references in JSON schemas
resolve_references() {
  echo "Resolving references in JSON schemas..."

  # Get the directory where this script is located
  local SCRIPT_DIR="$(dirname "$(realpath "$0")")"
  local RESOLVER_SCRIPT="$SCRIPT_DIR/scripts/ref-resolver.js"
  SCHEMA_PATH="$TEMP_DIR" node "$RESOLVER_SCRIPT"
}

# Function to generate type definitions for a file
generate_type_definition() {
  local file="$1"
  local relative_path="${file#$INPUT_DIR/}"

  local dir=$(dirname "$relative_path")
  local filename=$(basename "$file" .json)

  # Create subdirectory in output folder if it doesn't exist
  mkdir -p "$OUTPUT_DIR/$dir"
  mkdir -p "$OUTPUT_DIR_JSON/$dir"

  # Change to the directory containing the JSON file
  cd "$(dirname "$file")"

  # Generate TypeScript type definitions
  if output=$(npx json2ts --unreachableDefinitions --input "$(basename "$file")" --output "$OUTPUT_DIR/$dir/$filename.d.ts" 2>&1); then
    echo "Generated types for: $file"
  else
    echo "Failed to generate types for: $file"
    echo "Error: $output"
  fi

  # Generate json model definitions
  if output=$(npm run generate:json "$(realpath "$file")" "$OUTPUT_DIR_JSON/$dir/$filename.json" 2>&1); then
    echo "Generated json for: $file"
  else
    echo "Failed to generate json for: $file"
    echo "Error: $output"
  fi
  

  cd "$ORIGINAL_DIR"
}

# Function to generate schema export for a file
generate_schema_for_file() {
  local file="$1"
  local relative_path="${file#$TEMP_DIR/}"

  local dir=$(dirname "$relative_path")
  local filename=$(basename "$file" .json)
  local sanitized_filename=$(to_pascal_case_schema "$filename")

  # Create subdirectory in output folder if it doesn't exist
  mkdir -p "$OUTPUT_DIR/$dir"

  # Generate schema export file
  local schema_ts_file="$OUTPUT_DIR/$dir/$sanitized_filename.ts"
  generate_schema_export "$schema_ts_file" "$relative_path" "$file"
  echo "Generated schema exports for: $file"
}

# Function to traverse directory with a callback
traverse_directory() {
  local dir="$1"
  local callback="$2"
  for item in "$dir"/*; do
    if [ -d "$item" ]; then
      # If it's a directory, recurse into it
      traverse_directory "$item" "$callback"
    elif [ -f "$item" ] && [[ "$item" == *.json ]]; then
      # If it's a JSON file, call the provided callback
      $callback "$item"
    fi
  done
}

# Function to traverse directory for type generation
traverse_for_types() {
  traverse_directory "$1" generate_type_definition
}

# Function to traverse directory for schema generation
traverse_for_schemas() {
  traverse_directory "$1" generate_schema_for_file
}

echo "Step 1: Generating TypeScript type definitions..."
traverse_for_types "$INPUT_DIR"

echo "Step 2: Copying JSON and YAML files to temporary directory..."
rsync -a --include='*/' --include='*.json' --include='*.yml' --include='*.yaml' --exclude='*' "$INPUT_DIR/" "$TEMP_DIR/"

echo "Step 3: Resolving references in JSON schemas..."
resolve_references

echo "Step 4: Generating schema exports..."
traverse_for_schemas "$TEMP_DIR"

echo "Step 5: Generating OpenAPI types..."
OPENAPI_FILE="$INPUT_DIR/openapi.yml"
if [ -f "$OPENAPI_FILE" ]; then
  npx openapi-typescript "$OPENAPI_FILE" --output "$OUTPUT_DIR/openapi.d.ts"
  echo "Processed: $OPENAPI_FILE"
else
  echo "Error: OpenAPI file '$OPENAPI_FILE' does not exist."
fi

echo "Step 6: Cleaning up temporary directory..."
rm -rf "$TEMP_DIR"

echo "Processing complete. Output files are in '$OUTPUT_DIR'."