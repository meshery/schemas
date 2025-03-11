#!/usr/bin/env bash
# Check if both input and output directories are provided
if [ $# -ne 2 ]; then
  echo "Usage: $0 <input_directory> <output_directory>"
  exit 1
fi

INPUT_DIR=$(realpath "$1")
OUTPUT_DIR=$(realpath "$2")

# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
  echo "Error: Input directory '$INPUT_DIR' does not exist."
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Store the original directory
ORIGINAL_DIR=$(pwd)

# Function to convert to PascalCase with Schema suffix
to_pascal_case_schema() {
  local name="$1"
  # Replace spaces and hyphens with underscores first
  name=$(echo "$name" | sed 's/[ -]/_/g')
  # Convert to PascalCase and add Schema suffix
  name=$(echo "$name" | awk -F '_' '{for(i=1;i<=NF;i++)printf "%s", toupper(substr($i,1,1)) tolower(substr($i,2))}')
  echo "${name}Schema"
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

# Function to process files
process_file() {
  local file="$1"
  local relative_path="${file#$INPUT_DIR/}"

  local dir=$(dirname "$relative_path")
  local filename=$(basename "$file" .json)
  local sanitized_filename=$(to_pascal_case_schema "$filename")

  # Create subdirectory in output folder if it doesn't exist
  mkdir -p "$OUTPUT_DIR/$dir"

  # Change to the directory containing the JSON file
  cd "$(dirname "$file")"

  # Generate TypeScript type definitions
  if output=$(npx json2ts --unreachableDefinitions --input "$(basename "$file")" --output "$OUTPUT_DIR/$dir/$filename.d.ts" 2>&1); then
    echo "Generated types for: $file"
  else
    echo "Failed to generate types for: $file"
    echo "Error: $output"
  fi

  # Generate schema export file
  local schema_ts_file="$OUTPUT_DIR/$dir/$sanitized_filename.ts"
  generate_schema_export "$schema_ts_file" "$relative_path" "$(basename "$file")"
  echo "Generated schema exports for: $file"

  # Change back to the original directory
  cd "$ORIGINAL_DIR"
}

# Function to traverse directory
traverse_directory() {
  local dir="$1"
  for item in "$dir"/*; do
    if [ -d "$item" ]; then
      # If it's a directory, recurse into it
      traverse_directory "$item"
    elif [ -f "$item" ] && [[ "$item" == *.json ]]; then
      # If it's a JSON file, process it
      process_file "$item"
    fi
  done
}

# Start traversing from the provided input directory
traverse_directory "$INPUT_DIR"

# Generate OpenApi types from single openapi.yaml file
OPENAPI_FILE="$INPUT_DIR/openapi.yml"
if [ -f "$OPENAPI_FILE" ]; then
  npx openapi-typescript "$OPENAPI_FILE" --output "$OUTPUT_DIR/openapi.d.ts"
  echo "Processed: $OPENAPI_FILE"
else
  echo "Error: OpenAPI file '$OPENAPI_FILE' does not exist."
fi

echo "Processing complete. Output files are in '$OUTPUT_DIR'."