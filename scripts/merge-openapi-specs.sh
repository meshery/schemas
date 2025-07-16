#!/bin/bash

# Default configuration
CONFIG_FILE="./merge-openapi-config.sh"
TEMP_BUNDLE_DIR="./openapi/schemas/temp_schema_bundle"
OUTPUT_FILE="./schemas/openapi.yml"
SCHEMAS_DIR="./schemas/constructs"
DRY_RUN=false
LOG_LEVEL="INFO" # Options: DEBUG, INFO, ERROR

# Function to log messages with timestamp and level
log() {
    local level="$1"
    local message="$2"
    if [[ "$level" == "DEBUG" && "$LOG_LEVEL" != "DEBUG" ]]; then
        return
    fi
    if [[ "$level" == "INFO" && "$LOG_LEVEL" == "ERROR" ]]; then
        return
    fi
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $level: $message"
}

# Function to handle errors
handle_error() {
    log "ERROR" "$1"
    exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --debug)
            LOG_LEVEL="DEBUG"
            shift
            ;;
        --config)
            CONFIG_FILE="$2"
            shift 2
            ;;
        *)
            handle_error "Unknown argument: $1"
            ;;
    esac
done

# Load config file if exists
if [ -f "$CONFIG_FILE" ]; then
    log "INFO" "Loading configuration from $CONFIG_FILE"
    source "$CONFIG_FILE" || handle_error "Failed to load configuration file $CONFIG_FILE"
fi

# Check if required command exists
command -v redocly >/dev/null 2>&1 || handle_error "redocly command not found. Please install redocly."

# Check output directory permissions
OUTPUT_DIR=$(dirname "$OUTPUT_FILE")
if ! [ -w "$OUTPUT_DIR" ]; then
    handle_error "No write permission for output directory $OUTPUT_DIR"
fi

# Create schemas directory if it doesn't exist
if ! [ -d "$SCHEMAS_DIR" ]; then
    log "INFO" "Schemas directory $SCHEMAS_DIR does not exist, creating it"
    mkdir -p "$SCHEMAS_DIR" || handle_error "Failed to create schemas directory $SCHEMAS_DIR"
fi

# Create temp directory with error handling
if ! $DRY_RUN; then
    mkdir -p "$TEMP_BUNDLE_DIR" || handle_error "Failed to create temporary directory $TEMP_BUNDLE_DIR"
fi

# Remove output file if it exists
if [ -f "$OUTPUT_FILE" ]; then
    if ! $DRY_RUN; then
        rm "$OUTPUT_FILE" || log "WARNING" "Failed to remove existing output file $OUTPUT_FILE, proceeding"
    else
        log "INFO" "Dry run: Would remove existing output file $OUTPUT_FILE"
    fi
else
    log "INFO" "Output file $OUTPUT_FILE not found, proceeding with clean state"
fi

process_spec() {
    local spec_file="$1"
    local name
    # Create unique name using relative path to avoid conflicts
    name=$(echo "$spec_file" | sed 's|/|_|g').yml || handle_error "Failed to get name for $spec_file"
    
    log "INFO" "Processing $spec_file"
    if ! $DRY_RUN; then
        if ! redocly bundle "$spec_file" -o "$TEMP_BUNDLE_DIR/$name" 2>/dev/null; then
            handle_error "Failed to bundle $spec_file"
        fi
    fi
    log "DEBUG" "Successfully processed $spec_file"
}

# Process schema files recursively
schemas_to_join=""
file_count=0

while IFS= read -r spec_file; do
    if [ -f "$spec_file" ] && [[ "$spec_file" == *.yml ]]; then
        process_spec "$spec_file"
        schemas_to_join="$schemas_to_join $TEMP_BUNDLE_DIR/$(echo "$spec_file" | sed 's|/|_|g').yml"
        ((file_count++))
    fi
done < <(find "$SCHEMAS_DIR" -type f -name "openapi.yml")

# Check if any schemas were found
if [ $file_count -eq 0 ]; then
    log "WARNING" "No openapi.yml files found in $SCHEMAS_DIR, creating empty output file"
    if ! $DRY_RUN; then
        touch "$OUTPUT_FILE" || handle_error "Failed to create empty output file $OUTPUT_FILE"
    fi
    log "INFO" "Created empty output file $OUTPUT_FILE"
    exit 0
fi

log "INFO" "Joining $file_count schemas: $schemas_to_join"

# Join schemas with error handling
if ! $DRY_RUN; then
    if ! redocly join $schemas_to_join -o "$OUTPUT_FILE" 2>/dev/null; then
        handle_error "Failed to join schemas"
    fi
else
    log "INFO" "Dry run: Would join schemas to $OUTPUT_FILE"
fi

log "INFO" "Successfully joined $file_count OpenAPI specs"

# Clean up with error handling
if [ -d "$TEMP_BUNDLE_DIR" ] && ! $DRY_RUN; then
    rm -r "$TEMP_BUNDLE_DIR" || log "WARNING" "Failed to remove temporary directory $TEMP_BUNDLE_DIR"
    log "DEBUG" "Successfully removed temporary directory"
fi

log "INFO" "Script completed successfully"
