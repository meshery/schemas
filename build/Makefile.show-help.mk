#-----------------------------------------------------------------------------
# Makefile.show-help.mk - Auto-generated Help Target for Makefiles
#-----------------------------------------------------------------------------
#
# DESCRIPTION:
#   Provides a self-documenting help target that extracts and displays
#   all available Makefile targets with their descriptions. Targets are
#   documented using ## comments above the target definition.
#
# WHAT IT DOES:
#   1. Sets the default goal to show-help (runs when `make` is called without args)
#   2. Parses all Makefiles for ## comments and target names
#   3. Formats and displays available targets with descriptions
#
# USAGE:
#   Include this file in your Makefile:
#   include build/Makefile.show-help.mk
#
#   Document targets like this:
#   ## Build the project
#   build:
#       @echo "Building..."
#
#   Then run:
#   make          # Shows help (default)
#   make show-help # Explicitly shows help
#
# NOTE:
#   This is a common Makefile pattern for self-documenting build systems.
#   See: https://gist.github.com/klmr/575726c7e05d8780505a
#
#-----------------------------------------------------------------------------

.DEFAULT_GOAL := show-help
# See <https://gist.github.com/klmr/575726c7e05d8780505a> for explanation.
.PHONY: show-help
show-help:
	@echo "$$(tput bold)Please specify a build target. The choices are:$$(tput sgr0)";echo;sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' sort -f|awk -F --- -v n=$$(tput cols) -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"%s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'|more $(shell test $(shell uname) == Darwin && echo '-Xr')