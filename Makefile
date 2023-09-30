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

include install/Makefile.core.mk
include install/Makefile.show-help.mk


## Lint check Meshery Server.
golangci: error dep-check
	golangci-lint run


## Analyze error codes
error: dep-check
	go run github.com/layer5io/meshkit/cmd/errorutil -d . analyze -i ./server/helpers -o ./server/helpers --skip-dirs mesheryctl

## Runs meshkit error utility to update error codes for meshery server only.
server-error-util:
	go run github.com/layer5io/meshkit/cmd/errorutil -d . --skip-dirs mesheryctl update -i ./server/helpers/ -o ./server/helpers

#-----------------------------------------------------------------------------
# Meshery APIs
#-----------------------------------------------------------------------------
.PHONY: swagger-build swagger swagger-docs-build graphql-docs-build graphql-build
## Build Meshery REST API specifications
swagger-build:
	swagger generate spec -o ./server/helpers/swagger.yaml --scan-models

## Generate and serve Meshery REST API specifications
swagger: swagger-build
	swagger serve ./server/helpers/swagger.yaml

## Build Meshery REST API documentation
swagger-docs-build:
	swagger generate spec -o ./docs/_data/swagger.yml --scan-models; \
	swagger flatten ./docs/_data/swagger.yml -o ./docs/_data/swagger.yml --with-expand --format=yaml


## Building Meshery docs with redocly
redocly-docs-build:
	npx @redocly/cli build-docs ./docs/_data/swagger.yml --config='redocly.yaml' -t custom.hbs

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
