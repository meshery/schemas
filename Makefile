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
.PHONY: setup generate-ts publish-ts bundle-openapi generate-golang generate-rtk test-rtk golangci validate-schemas validate-schemas-strict audit-schemas audit-schemas-full audit-schemas-style-full audit-schemas-debt-full

## (Re)Initialize Golang (go.mod) and Node (package.json) manifests
setup:
	go mod tidy
	npm install --legacy-peer-deps

## Generate typescript library, json templates, yaml templates
generate-ts:
	npm run generate:types

## Bundle Typescript library, json templates, yaml templates
build-ts: generate-ts
	rm -rf dist/
	npm run build
	node build/generate-schema-dts.js

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
	$(MAKE) --no-print-directory test-rtk

## Run RTK Query generation regression tests
test-rtk:
	node --test tests/generate-rtk.test.js

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
	go run ./cmd/validate-schemas

## Fail on all schema design, style, and contract debt across validated APIs
validate-schemas-strict:
	go run ./cmd/validate-schemas --strict-consistency --style-debt --contract-debt

## Report new advisory schema issues without failing the build (uses advisory baseline)
audit-schemas:
	go run ./cmd/validate-schemas --warn

## Report the full actionable advisory schema backlog without failing the build
audit-schemas-full:
	go run ./cmd/validate-schemas --warn --no-baseline

## Report the full advisory backlog including legacy style debt without failing the build
audit-schemas-style-full:
	go run ./cmd/validate-schemas --warn --no-baseline --style-debt

## Report the full advisory backlog including legacy style and contract debt without failing the build
audit-schemas-debt-full:
	go run ./cmd/validate-schemas --warn --no-baseline --style-debt --contract-debt

## Regenerate the Phase 0 field-count baseline artifact
.PHONY: baseline-field-count
baseline-field-count:
	go run ./cmd/phase0-field-count

## Regenerate the Phase 0 tag-divergence baseline artifact
## (scans json/db struct tags in $(MESHERY_REPO) and $(CLOUD_REPO))
.PHONY: baseline-tag-divergence
baseline-tag-divergence:
	@go run ./cmd/phase0-tag-divergence \
		$(if $(MESHERY_REPO),--meshery-repo=$(MESHERY_REPO)) \
		$(if $(CLOUD_REPO),--cloud-repo=$(CLOUD_REPO))

## Regenerate the Phase 0 consumer-audit verbatim baseline
## (captures verbose make consumer-audit output against local sibling repos)
.PHONY: baseline-consumer-audit
baseline-consumer-audit:
	@output_dir=validation/baseline; \
	output_file=$$output_dir/consumer-audit.txt; \
	mkdir -p "$$output_dir"; \
	tmp_file=$$(mktemp "$$output_dir/consumer-audit.txt.XXXXXX"); \
	if $(MAKE) --no-print-directory consumer-audit \
		MESHERY_REPO="$(if $(MESHERY_REPO),$(MESHERY_REPO),../meshery)" \
		CLOUD_REPO="$(if $(CLOUD_REPO),$(CLOUD_REPO),../meshery-cloud)" \
		VERBOSE=1 > "$$tmp_file"; then \
		mv "$$tmp_file" "$$output_file"; \
		echo "phase0-consumer-audit: captured $$(wc -l < $$output_file) lines -> $$output_file"; \
	else \
		status=$$?; \
		rm -f "$$tmp_file"; \
		echo "phase0-consumer-audit: consumer-audit failed (exit $$status); baseline unchanged" >&2; \
		exit $$status; \
	fi

## Regenerate the Phase 0 consumer-dependency graph
## (Go + TS imports of schemas across all three downstream repos)
.PHONY: baseline-consumer-graph
baseline-consumer-graph:
	@go run ./cmd/phase0-consumer-graph \
		$(if $(MESHERY_REPO),--meshery-repo="$(MESHERY_REPO)") \
		$(if $(CLOUD_REPO),--cloud-repo="$(CLOUD_REPO)") \
		$(if $(EXTENSIONS_REPO),--extensions-repo="$(EXTENSIONS_REPO)")

#-----------------------------------------------------------------------------
# Consumer audit (schemas vs. consumer repos)
#-----------------------------------------------------------------------------
.PHONY: consumer-audit consumer-audit-update

# Override via:
#   make consumer-audit MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud \
#                       EXTENSIONS_REPO=../meshery-extensions
# Each *_REPO variable is optional; the audit iterates every registered
# consumer (Go Gorilla, Go Echo, TypeScript RTK Query) and skips trees that
# were not provided. MESHERY_REPO_UI / CLOUD_REPO_UI override the TS scan
# path independently of the Go path (rarely needed — only when the UI lives
# in a separate checkout).
MESHERY_REPO     ?=
CLOUD_REPO       ?=
EXTENSIONS_REPO  ?=
MESHERY_REPO_UI  ?=
CLOUD_REPO_UI    ?=
SHEET_ID         ?=
CREDENTIALS      ?=

## Dry-run the consumer audit without reconciling or updating Google Sheets.
consumer-audit:
	@go run ./cmd/consumer-audit \
		$(if $(MESHERY_REPO),--meshery-repo=$(MESHERY_REPO)) \
		$(if $(CLOUD_REPO),--cloud-repo=$(CLOUD_REPO)) \
		$(if $(EXTENSIONS_REPO),--extensions-repo=$(EXTENSIONS_REPO)) \
		$(if $(MESHERY_REPO_UI),--meshery-repo-ui=$(MESHERY_REPO_UI)) \
		$(if $(CLOUD_REPO_UI),--cloud-repo-ui=$(CLOUD_REPO_UI)) \
		$(if $(VERBOSE),--verbose)

## Reconcile the consumer audit against the canonical Google Sheet and update it.
consumer-audit-update:
	@if [ -z "$(SHEET_ID)" ] || [ -z "$(CREDENTIALS)" ]; then \
		echo "consumer-audit-update: SHEET_ID and CREDENTIALS are required"; exit 1; \
	fi
	@go run ./cmd/consumer-audit \
		$(if $(MESHERY_REPO),--meshery-repo=$(MESHERY_REPO)) \
		$(if $(CLOUD_REPO),--cloud-repo=$(CLOUD_REPO)) \
		$(if $(EXTENSIONS_REPO),--extensions-repo=$(EXTENSIONS_REPO)) \
		$(if $(MESHERY_REPO_UI),--meshery-repo-ui=$(MESHERY_REPO_UI)) \
		$(if $(CLOUD_REPO_UI),--cloud-repo-ui=$(CLOUD_REPO_UI)) \
		$(if $(VERBOSE),--verbose) \
		--sheet-id=$(SHEET_ID) \
		--credentials=$(CREDENTIALS)

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

# oapi-codegen
ifeq (,$(shell command -v oapi-codegen))
	@echo "Dependency missing: oapi-codegen. Install oapi-codegen"
	@echo "installing oapi-codegen"
	# for the binary install
	go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
endif
