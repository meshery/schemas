#!/usr/bin/env bash

generate_schema_models() {
    local package="$1"
    local version="$2"
    local input_override="$3"

    # ANSI color codes
    GREEN="\033[0;32m"
    RED="\033[0;31m"
    YELLOW="\033[0;33m"
    CYAN="\033[0;36m"
    NC="\033[0m"

    if [[ -z "$package" || -z "$version" ]]; then
        echo -e "${RED}Usage: generate_schema_models <package> <version> [input_override]${NC}"
        return 1
    fi

    local input_schema="${input_override:-schemas/constructs/${version}/${package}/openapi.yml}"
    local merged_output="schemas/constructs/${version}/${package}/merged-openapis.yml"
    local output_go_file="models/${version}/${package}/${package}.go"

    if [[ ! -f "$input_schema" ]]; then
        echo -e "${RED}Error: Schema not found: $input_schema${NC}"
        return 1
    fi

    echo -e "${CYAN}🔹 Processing: $package ($version)...${NC}"

    npx swagger-cli bundle --dereference "$input_schema" -o "$merged_output" > /dev/null || {
        echo -e "${RED}❌ Bundling failed!${NC}"; return 1;
    }

    oapi-codegen --config openapi.config.yml --package "$package" -generate types --include-tags all -o "$output_go_file" "$merged_output" || {
        echo -e "${RED}❌ Model generation failed!${NC}"; rm -f "$merged_output"; return 1;
    }

    rm -f "$merged_output"
    echo -e "${GREEN}✅ Generated: $output_go_file${NC}"
}

# Run model generation for multiple packages
generate_schema_models "capability" "v1alpha1"
generate_schema_models "category" "v1beta1"
# there are some discrepancies in the schema ( missing some field related to db which are present in the code)
# generate_schema_models "model" "v1beta1"
# generate_schema_models "component" "v1beta1"
generate_schema_models "pattern" "v1beta1" "schemas/constructs/v1beta1/design/openapi.yml"
generate_schema_models "core" "v1alpha1"
generate_schema_models "catalog" "v1alpha2"