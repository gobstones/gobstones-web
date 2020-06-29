TEMP_DIR="bower_components/.tmp" 
mkdir -p "$TEMP_DIR"
cp gs-element-blockly.html "$TEMP_DIR/gs-element-blockly.html.original"
cp -r js "$TEMP_DIR"

MAIN_FILE="$TEMP_DIR/gs-element-blockly.html"

vulcanize --inline-scripts --inline-css --strip-exclude=polymer.html "$MAIN_FILE.original" > "$MAIN_FILE"
rm -rf "$MAIN_FILE.original" "$TEMP_DIR/js"

echo "$MAIN_FILE"
