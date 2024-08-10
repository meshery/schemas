#!/bin/sh
temp_bundle_dir="./openapi/schemas/temp_schema_bundle"
mkdir $temp_dir_name
rm "./schemas/openapi.yml"
process_spec() {
  echo "processing $1 ..."
  name=$(basename $1)
  redocly bundle $1 -o "$temp_bundle_dir/$name"
  echo "\n"
}


schemas_dir="./schemas/constructs/openapi"
for s in $schemas_dir/*; do
  if [[ -f $s ]]; then
    process_spec $s
  fi
done

schemas_to_join=''

for s in $temp_bundle_dir/*; do
echo $s
  if [[ -f $s ]]; then
    schemas_to_join+="$s "
  fi
done

echo "\njoining following schemas $schemas_to_join\n"

redocly join $schemas_to_join -o ./schemas/openapi.yml

echo "Successfully joined openapi specs. Removing temp dir."

rm -r $temp_bundle_dir