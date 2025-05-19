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

include build/Makefile.core.mk
include build/Makefile.show-help.mk

#-----------------------------------------------------------------------------
# Schemas Site and public reference
#-----------------------------------------------------------------------------
.PHONY: site

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

## Generate typescript library, json templates, yaml templates
generate-types:
	npm run generate:types

## Generate typescript library
generate-ts: generate-types

build-ts: generate-ts
	npm run build

publish-ts: build-ts
	npm run publish-ts-lib


resolve-ref: setup
	SCHEMA_PATH=$(path) node scripts/ref-resolver.js

golang-generate:
	./generate-golang.sh

setup:
	go mod tidy
	npm install

# depends on order , golang-generate generates some artifacts that are used in the next step ( TODO: promote golang-generate to a parent build script)
build:  golang-generate generate-ts  build-ts

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
endif

# redocly cli
ifeq (,$(shell command -v redocly))
	@echo "Dependency missing: redocly. Install redocly cli from https://redoc.ly/docs/cli/installation/"
	@echo "installing redocly"
	npm install -g @redocly/cli
endif

# oapi-codegen
ifeq (,$(shell command -v oapi-codegen))
	@echo "Dependency missing: oapi-codegen. Install oapi-codegen cli from
	@echo "installing oapi-codegen"
	# for the binary install
	go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
endif





