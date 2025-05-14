#!/usr/bin/env bash

merged_construct="merged-openapi.yml"

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
    local merged_output="schemas/constructs/${version}/${package}/${merged_construct}"
    local output_go_file="models/${version}/${package}/${package}.go"

    mkdir -p "models/${version}/${package}"
    touch "$output_go_file"

    if [[ ! -f "$input_schema" ]]; then
        echo -e "${RED}Error: Schema not found: $input_schema${NC}"
        return 1
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
    sed -i 's/\(json:"\([^"]*\)"\)\( yaml:"[^"]*"\)\?/\1 yaml:"\2"/g' "$output_go_file"
    # same for db tags
    # sed -i 's/\(json:"\([^"]*\)"\)\( db:"[^"]*"\)\?/\1 db:"\2"/g' "$output_go_file"

    # npx @redocly/cli join $merged_output schemas/merged_openapi.yml -o schemas/merged_openapi.yml --without-x-tag-groups

    # rm -f "$merged_output"
    echo -e "${GREEN}✅ Generated: $output_go_file${NC}"
}

# generate e,pty schema for the merged openapi
# touch schemas/merged_openapi.yml
# echo "openapi: 3.0.0" > schemas/merged_openapi.yml
# echo "info:" >> schemas/merged_openapi.yml
# echo "  title: Merged API Spec" >> schemas/merged_openapi.yml
# echo "  version: 1.0.0" >> schemas/merged_openapi.yml
# echo "paths: {}" >> schemas/merged_openapi.yml




# Run model generation for multiple packages
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


v1beta1="schemas/constructs/v1beta1"
v1alpha1="schemas/constructs/v1alpha1"
v1alpha2="schemas/constructs/v1alpha2"

# version,construct
# returns the {version}+{construct}+{merged_construct}

# generate bundle for layer5 cloud
npx @redocly/cli join schemas/base_cloud.yml \
     "${v1beta1}/pattern/${merged_construct}" \
     "${v1beta1}/component/${merged_construct}" \
     "${v1beta1}/model/${merged_construct}" \
     "${v1beta1}/subscription/${merged_construct}" \
     "${v1beta1}/plan/${merged_construct}" \
     "${v1beta1}/feature/${merged_construct}" \
     "${v1beta1}/workspace/${merged_construct}" \
     "${v1beta1}/environment/${merged_construct}" \
     "${v1alpha2}/catalog/${merged_construct}" \
 -o schemas/cloud_openapi.yml  --prefix-tags-with-info-prop title --prefix-components-with-info-prop title

 # generate bundle for meshery
 npx @redocly/cli join schemas/base_meshery.yml \
      "${v1beta1}/evaluation/${merged_construct}" \
      "${v1beta1}/pattern/${merged_construct}" \
      "${v1beta1}/component/${merged_construct}" \
      "${v1beta1}/model/${merged_construct}" \
      "${v1beta1}/workspace/${merged_construct}" \
      "${v1beta1}/environment/${merged_construct}" \
  -o schemas/meshery_openapi.yml  --prefix-tags-with-info-prop title --prefix-components-with-info-prop title