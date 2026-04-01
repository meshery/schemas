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

jekyll = bundle exec jekyll

## Build and run schemas.meshery.io website
site:
	bundle install; $(jekyll) serve --drafts --incremental --livereload

#-----------------------------------------------------------------------------
# OpenAPI spec
#-----------------------------------------------------------------------------
.PHONY: setup docs-build generate-ts publish-ts bundle-openapi generate-golang generate-rtk golangci validate-schemas validate-schemas-strict audit-schemas audit-schemas-full audit-schemas-style-full audit-schemas-debt-full

## (Re)Initialize Golang (go.mod) and Node (package.json) manifests
setup:
	go mod tidy
	npm install --legacy-peer-deps

## Build API docs with redocly
docs-build: dep-check
	redocly bundle --output openapi/bundled-schema.yml
	redocly build-docs openapi/bundled-schema.yml --output=openapi/index.html
	rm openapi/bundled-schema.yml

## Generate typescript library, json templates, yaml templates
generate-ts:
	npm run generate:types

## Bundle Typescript library, json templates, yaml templates
build-ts: generate-ts
	npm run build

## Publish schemas package to @meshery/schemas on npmjs.com
publish-ts: build-ts
	npm run publish-ts-lib

## Bundle and merge OpenAPI specifications into _openapi_build/
bundle-openapi: dep-check
	node build/bundle-openapi.js

## Generate Golang Models (requires bundle-openapi)
generate-golang: bundle-openapi
	node build/generate-golang.js

## Generate RTK Query clients (requires bundle-openapi)
generate-rtk: bundle-openapi
	node build/generate-rtk.js

## Generate Golang Models (legacy alias for generate-golang)
golang-generate: generate-golang

#-----------------------------------------------------------------------------
# Permissions
#-----------------------------------------------------------------------------
.PHONY: generate-permissions generate-permissions-go generate-permissions-ts test-golang

## Generate Go permission key constants from permissions.csv
generate-permissions-go:
	node build/generate-permission-golang.js

## Generate TypeScript permission key constants from permissions.csv
generate-permissions-ts:
	node build/generate-permissions-ts.js

## Generate both Go and TypeScript permission key constants
generate-permissions: generate-permissions-go generate-permissions-ts

## Run Go tests
test-golang:
	go build ./...
	go test ./... -v

## Lint check Meshery Server.
golangci: dep-check
	golangci-lint run

## Validate schema design rules (Dual-Schema Pattern, additionalProperties)
validate-schemas:
	node build/validate-schemas.js

## Fail on all schema design, style, and contract debt across validated APIs
validate-schemas-strict:
	node build/validate-schemas.js --strict-consistency --style-debt --contract-debt

## Report new advisory schema issues without failing the build (uses advisory baseline)
audit-schemas:
	node build/validate-schemas.js --warn

## Report the full actionable advisory schema backlog without failing the build
audit-schemas-full:
	node build/validate-schemas.js --warn --no-baseline

## Report the full advisory backlog including legacy style debt without failing the build
audit-schemas-style-full:
	node build/validate-schemas.js --warn --no-baseline --style-debt

## Report the full advisory backlog including legacy style and contract debt without failing the build
audit-schemas-debt-full:
	node build/validate-schemas.js --warn --no-baseline --style-debt --contract-debt

#-----------------------------------------------------------------------------
# Schema information
#-----------------------------------------------------------------------------
.PHONY: schemas-versions schemas-versions-latest

## List all schema constructs with their available API versions
schemas-versions:
	@ls -d schemas/constructs/v*/*/api.yml 2>/dev/null \
		| sed 's|schemas/constructs/||;s|/api.yml||' \
		| awk -F/ '{ constructs[$$2] = constructs[$$2] ? constructs[$$2] " " $$1 : $$1 } \
			END { for (c in constructs) printf "%-20s %s\n", c, constructs[c] }' \
		| sort

## List only the latest API version of each schema construct
schemas-versions-latest:
	@ls -d schemas/constructs/v*/*/api.yml 2>/dev/null \
		| sed 's|schemas/constructs/||;s|/api.yml||' \
		| awk -F/ '{ constructs[$$2] = $$1 } \
			END { for (c in constructs) printf "%-20s %s\n", c, constructs[c] }' \
		| sort

## Generate and bundle schema package (bundles OpenAPI, generates Go, RTK, TypeScript, and permissions)
build: validate-schemas bundle-openapi generate-golang  generate-rtk generate-ts generate-permissions build-ts test-golang

#-----------------------------------------------------------------------------
# Dependencies
#-----------------------------------------------------------------------------
.PHONY: dep-check
#.SILENT: dep-check

INSTALLED_GO_VERSION = $(shell go version)

## Check local system for required dependencies
dep-check:

# golang
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

# redocly cli
ifeq (,$(shell command -v redocly))
	@echo "Dependency missing: redocly. Install redocly cli from https://redoc.ly/docs/cli/installation/"
	@echo "installing redocly"
	npm install -g @redocly/cli
endif

# oapi-codegen
ifeq (,$(shell command -v oapi-codegen))
	@echo "Dependency missing: oapi-codegen. Install oapi-codegen"
	@echo "installing oapi-codegen"
	# for the binary install
	go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
endif