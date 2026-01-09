#!/usr/bin/env bash
#
# latest_release.sh - Git Release Version Information Script
#
# DESCRIPTION:
#   Retrieves and outputs version information from git tags for use in
#   build and release processes. Determines release channel (stable/edge)
#   based on git reference type.
#
# WHAT IT DOES:
#   1. Determines if current git reference is a tag or branch
#   2. Sets release channel to "stable" for tags, "edge" for branches
#   3. Outputs latest version information in various formats
#
# USAGE:
#   ./build/latest_release.sh
#
#   Or source it to get environment variables:
#   source ./build/latest_release.sh
#
# OUTPUT:
#   Prints to stdout:
#   - RELEASE_CHANNEL: "stable" or "edge"
#   - LATEST_VERSION: Full git describe output (e.g., v0.7.0)
#   - GIT_VERSION: Same as LATEST_VERSION
#   - GIT_STRIPPED_VERSION: Version without 'v' prefix (e.g., 0.7.0)
#
# NOTE:
#   This script is used by CI/CD pipelines and Makefile targets
#   to determine version information for releases.
#
# GIT_REF=`git symbolic-ref HEAD`
# if [[ $GIT_REF = refs/tags* ]]
# then
# 	RELEASE_CHANNEL="stable"
# 	# export RELEASE_CHANNEL="stable"
# else
# 	RELEASE_CHANNEL="edge"
#  	# export RELEASE_CHANNEL="edge"
#  fi
# # echo "Release channel determined to be $RELEASE_CHANNEL"
# LATEST_VERSION=$(git describe --tags `git rev-list --tags --max-count=1`)
GIT_REF=`git symbolic-ref HEAD`
if [[ $GIT_REF = refs/tags* ]]
then
RELEASE_CHANNEL="stable"
# export RELEASE_CHANNEL="stable"
else
RELEASE_CHANNEL="edge"
# export RELEASE_CHANNEL="edge"
fi
echo "Release channel determined to be $RELEASE_CHANNEL"
echo LATEST_VERSION=$(git describe --tags `git rev-list --tags --max-count=1` --always)
echo GIT_VERSION=$(git describe --tags `git rev-list --tags --max-count=1` --always)
echo GIT_STRIPPED_VERSION=$(git describe --tags `git rev-list --tags --max-count=1` --always | cut -c 2-)
# env