# Copyright Meshery Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


jekyll=bundle exec jekyll

site:
	bundle install; $(jekyll) serve --drafts --incremental --livereload 


## Lint check Meshery Server.
golangci: error dep-check
	golangci-lint run

#-----------------------------------------------------------------------------
# OpenAPI spec
#-----------------------------------------------------------------------------
.PHONY: redocly-docs-build api-validate schemas-join docs-build

## Validate Remote provider APIs against OpenAPI spec
api-validate:
	openapi-generator validate -i schemas/openapi.yml

schemas-join:
	chmod +x scripts/merge-openapi-specs.sh
	scripts/merge-openapi-specs.sh

## Building docs with redocly
docs-build:
	redocly bundle --output openapi/bundled-schema.yml
	redocly build-docs openapi/bundled-schema.yml --output=openapi/index.html
	rm openapi/bundled-schema.yml

## Generate typescript library
generate-ts:
	npm run generate:types

build-ts: generate-ts
	npm run build

publish-ts: build-ts
	npm run publish-ts-lib


resolve-ref: setup
	SCHEMA_PATH=$(path) node scripts/ref-resolver.js 

setup:
	npm install
#-----------------------------------------------------------------------------
# Dependencies
#-----------------------------------------------------------------------------
.PHONY: dep-check
#.SILENT: dep-check

INSTALLED_GO_VERSION=$(shell go version)

dep-check:

ifeq (,$(findstring $(GOVERSION), $(INSTALLED_GO_VERSION)))
# Only send a warning.
	@echo "Dependency missing: go$(GOVERSION). Ensure 'go$(GOVERSION).x' is installed and available in your 'PATH'"
	@echo "GOVERSION: " $(GOVERSION)
	@echo "INSTALLED_GO_VERSION: " $(INSTALLED_GO_VERSION)
# Force error and stop.
#	$(error Found $(INSTALLED_GO_VERSION). \
#	 Required golang version is: 'go$(GOVERSION).x'. \
#	 Ensure go '$(GOVERSION).x' is installed and available in your 'PATH'.)
endif

# redocly join openapi/schemas/applications.yml openapi/schemas/capabilities.yml openapi/schemas/catalog.yml openapi/schemas/collaboration.yml openapi/schemas/connections.yml openapi/schemas/credentials.yml openapi/schemas/events.yml  openapi/schemas/meshmodels.yml openapi/schemas/smp_profile.yml openapi/schemas/tokens.yml openapi/schemas/user_onboarding.yml openapi/schemas/users.yml



# redocly join openapi-schema/schemas/applications.yml openapi-schema/schemas/connections.yml yml openapi-schema/schemas/user_onboarding.yml openapi-schema/schemas/users.yml
