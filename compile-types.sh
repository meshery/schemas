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

# Function to process files
process_file() {
    local file="$1"
    local relative_path="${file#$INPUT_DIR/}"  # Remove base directory from path
    local dir=$(dirname "$relative_path")
    local filename=$(basename "$file" .json)

    # Create subdirectory in output folder if it doesn't exist
    mkdir -p "$OUTPUT_DIR/$dir"

    # Change to the directory containing the JSON file
    cd "$(dirname "$file")"

    # Run npx json2ts and capture both stdout and stderr
    if output=$(npx json2ts --input "$(basename "$file")" --output "$OUTPUT_DIR/$dir/$filename.d.ts" 2>&1); then
        echo "Processed: $file"
    else
        echo "Failed to process: $file"
        echo "Error: $output"
    fi

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