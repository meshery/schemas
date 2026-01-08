#!/usr/bin/env bash
set -euo pipefail  # ✅ Exit on error, unset vars, and pipefail

# Disable telemetry for @redocly/cli
export REDOCLY_TELEMETRY=off

merged_construct="merged-openapi.yml"

generate_schema_models() {

    local package="$1"
    local version="$2"
    local input_override="${3:-}"

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
    local merged_output="_openapi_build/constructs/${version}/${package}/${merged_construct}"
    local output_go_file="models/${version}/${package}/${package}.go"

    mkdir -p "_openapi_build/constructs/${version}/${package}"
    mkdir -p "models/${version}/${package}"
    touch "$output_go_file"

    if [[ ! -f "$input_schema" ]]; then
        echo -e "${RED}Error: Schema not found: $input_schema${NC}"
        exit 1
    fi

    echo -e "${CYAN}🔹 Processing: $package ($version)...${NC}"

    npx --yes swagger-cli bundle --dereference "$input_schema" -o "$merged_output"  || {
        echo -e "${RED}❌ Bundling failed!${NC}"; return 1;
    }

    oapi-codegen --config openapi.config.yml --package "$package" -generate types --include-tags all -o "$output_go_file" "$merged_output" || {
        echo -e "${RED}❌ Model generation failed!${NC}"; rm -f "$merged_output"; return 1;
    }
    # 🏆 Apply sed to inject YAML struct tags alongside JSON ones
    #  Add yaml struct tags only if missing, avoiding duplicates or overwrites
    # the added yaml tags are the same as the json tags default or user defined
    # Use a portable sed approach that works on both BSD (macOS) and GNU (Linux) sed
    sed 's/\(json:"\([^"]*\)"\)\( yaml:"[^"]*"\)\?/\1 yaml:"\2"/g' "$output_go_file" > "$output_go_file.tmp" && mv "$output_go_file.tmp" "$output_go_file"
    # same for db tags
    # sed 's/\(json:"\([^"]*\)"\)\( db:"[^"]*"\)\?/\1 db:"\2"/g' "$output_go_file" > "$output_go_file.tmp" && mv "$output_go_file.tmp" "$output_go_file"

    # npx @redocly/cli join $merged_output schemas/merged_openapi.yml -o schemas/merged_openapi.yml --without-x-tag-groups

    # rm -f "$merged_output"
    echo -e "${GREEN}✅ Generated: $output_go_file${NC}"
}





# # Run model generation for multiple packages
generate_schema_models "badge" "v1beta1"
generate_schema_models "capability" "v1alpha1"
generate_schema_models "category" "v1beta1"
generate_schema_models "subcategory" "v1beta1"
# there are some discrepancies in the schema ( missing some field related to db which are present in the code)
generate_schema_models "model" "v1beta1"
generate_schema_models "component" "v1beta1"
generate_schema_models "pattern" "v1beta1" "schemas/constructs/v1beta1/design/openapi.yml"
generate_schema_models "core" "v1alpha1"
generate_schema_models "catalog" "v1alpha2"
generate_schema_models "subscription" "v1beta1"
generate_schema_models "plan" "v1beta1"
generate_schema_models "feature" "v1beta1"
generate_schema_models "evaluation" "v1beta1"
generate_schema_models "workspace" "v1beta1"
generate_schema_models "environment" "v1beta1"
generate_schema_models "user" "v1beta1"
generate_schema_models "academy" "v1beta1"
generate_schema_models "event" "v1beta1"
generate_schema_models "organization" "v1beta1"
generate_schema_models "connection" "v1beta1"
generate_schema_models "invitation" "v1beta1"

v1beta1="_openapi_build/constructs/v1beta1"
v1alpha1="_openapi_build/constructs/v1alpha1"
v1alpha2="_openapi_build/constructs/v1alpha2"

# version,construct
# returns the {version}+{construct}+{merged_construct}

# generate bundle for meshery cloud
mkdir -p _openapi_build
npx --yes @redocly/cli join schemas/base_cloud.yml \
     "${v1beta1}/pattern/${merged_construct}" \
     "${v1beta1}/component/${merged_construct}" \
     "${v1beta1}/model/${merged_construct}" \
     "${v1beta1}/subscription/${merged_construct}" \
     "${v1beta1}/plan/${merged_construct}" \
     "${v1beta1}/feature/${merged_construct}" \
     "${v1beta1}/workspace/${merged_construct}" \
     "${v1beta1}/environment/${merged_construct}" \
     "${v1alpha2}/catalog/${merged_construct}" \
     "${v1beta1}/evaluation/${merged_construct}" \
     "${v1beta1}/user/${merged_construct}" \
     "${v1beta1}/academy/${merged_construct}" \
     "${v1beta1}/invitation/${merged_construct}" \
     "${v1beta1}/badge/${merged_construct}" \
 -o _openapi_build/merged_openapi.yml  --prefix-tags-with-info-prop title --prefix-components-with-info-prop title

node scripts/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/cloud_openapi.yml cloud
node scripts/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/meshery_openapi.yml  meshery


# Generate rtk query api
npx --yes @rtk-query/codegen-openapi typescript/rtk/cloud-rtk-config.ts
npx --yes @rtk-query/codegen-openapi typescript/rtk/meshery-rtk-config.ts

echo -e "${GREEN}✅ Merged OpenAPI files generated in _openapi_build/${NC}"
