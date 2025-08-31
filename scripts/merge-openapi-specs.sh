#!/usr/bin/env bash
set -euo pipefail  # ✅ Exit on error, unset vars, and pipefail

# ANSI color codes
GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[0;33m"
CYAN="\033[0;36m"
NC="\033[0m"

merged_construct="merged-openapi.yml"
v1beta1="schemas/constructs/v1beta1"
v1alpha1="schemas/constructs/v1alpha1"
v1alpha2="schemas/constructs/v1alpha2"

echo -e "${CYAN}🔹 Merging OpenAPI specifications...${NC}"

# Use exact order from generate-golang.sh
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
    -o schemas/merged_openapi.yml \
    --prefix-tags-with-info-prop title \
    --prefix-components-with-info-prop title || {
    echo -e "${RED}❌ Schema merging failed!${NC}"
    exit 1
}

echo -e "${GREEN}✅ Successfully joined OpenAPI specifications${NC}"

echo -e "${CYAN}🔹 Filtering schemas by tag...${NC}"

# Filter schemas by tag (matching generate-golang.sh)
node scripts/filterOpenapiByTag.js schemas/merged_openapi.yml schemas/cloud_openapi.yml cloud || {
    echo -e "${RED}❌ Cloud schema filtering failed!${NC}"
    exit 1
}

node scripts/filterOpenapiByTag.js schemas/merged_openapi.yml schemas/meshery_openapi.yml meshery || {
    echo -e "${RED}❌ Meshery schema filtering failed!${NC}"
    exit 1
}

echo -e "${GREEN}✅ All done!${NC}"