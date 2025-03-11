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

# Function to sanitize names for JavaScript/TypeScript compatibility
sanitize_name() {
  local name="$1"
  # Replace hyphens with underscores
  name=$(echo "$name" | sed 's/-/_/g')
  echo "$name"
}

# Function to process files - generates both type definitions and schema exports
process_file() {
  local file="$1"
  local relative_path="${file#$INPUT_DIR/}" # Remove base directory from path

  local dir=$(dirname "$relative_path")
  local filename=$(basename "$file" .json)
  local sanitized_filename=$(sanitize_name "$filename")

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

  # Create a Typescript file that exports the schema
  local schema_ts_file="$OUTPUT_DIR/$dir/$sanitized_filename.schema.ts"
  echo "// Generated from $relative_path" > "$schema_ts_file"
  echo "// This file exports the original JSON schema" >> "$schema_ts_file"
  echo "" >> "$schema_ts_file"
  echo "const schema = $(cat "$(basename "$file")")" >> "$schema_ts_file"
  echo "" >> "$schema_ts_file"
  echo "export default schema;" >> "$schema_ts_file"

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

echo "Processing complete. Output files are in '$OUTPUT_DIR'."