## v1beta1
# npx swagger-cli bundle -r schemas/constructs/v1beta1/model/openapi.yml -o schemas/constructs/v1beta1/model/merged-openapis.yml
# oapi-codegen --config openapi.config.yml --package model -generate types --include-tags all -o models/v1beta1/model/model.go schemas/constructs/v1beta1/model/merged-openapis.yml
generate_schema_models() {
    local package="$1"
    local version="$2"

    if [[ -z "$package" || -z "$version" ]]; then
        echo "Usage: generate_api_models <package> <version>"
        return 1
    fi

    local input_schema="schemas/constructs/${version}/${package}/openapi.yml"
    local merged_output="schemas/constructs/${version}/${package}/merged-openapis.yml"

    local merged_output2="schemas/constructs/${version}/${package}/openapi.yml"
    local output_go_file="models/${version}/${package}/${package}.go"

    echo "Bundling OpenAPI schema..."
    npx swagger-cli bundle -r "$input_schema" -o "$merged_output"

    if [[ $? -ne 0 ]]; then
        echo "Error: Failed to bundle OpenAPI schema."
        return 1
    fi

    echo "Generating Go models..."
    oapi-codegen --config openapi.config.yml   --package "$package" -generate types --include-tags all -o "$output_go_file" "$merged_output2"

    if [[ $? -ne 0 ]]; then
        echo "Error: Failed to generate Go models."
        return 1
    fi

    echo "API models generated successfully: $output_go_file"
}


generate_schema_models "model" "v1beta1"
generate_schema_models "capability" "v1alpha1"
