#!/bin/bash

echo "Remember: This requires node.js >= 7..."

if [[ -z "$1" ]]; then
    echo "Error: Missing argument 'GitHub token'!";
    exit;
fi;

GITHUB_TOKEN="$1"
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

function commertialName() {
  if [ "$1" == "blocks" ] ; then
    echo "jr"
  fi

  if [ "$1" == "code" ] ; then
    echo "sr"
  fi

  if [ "$1" == "teacher" ] ; then
    echo "teacher"
  fi
}

function try {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
      echo "!!!Error!!! with $1" >&2
      exit $status
  fi
  return $status
}

function build() {
  unset GH_TOKEN
  sudo rm -rf ./dist/

  try yarn dist:docker "yarn dist --mode $TYPE --platform linux --arch x64 --target AppImage"
  try yarn dist:docker "yarn dist --mode $TYPE --platform win --arch ia32 --target nsis"
  try yarn dist:docker "yarn dist --mode $TYPE --platform win --arch x64 --target nsis"
}

rm -rf app/guides.zip app/guides app/cache_config.json

# ---

TYPE="blocks"
echo "BUILDING '$TYPE' WITH ELECTRON..."
build

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_1=gobstones-$(commertialName $TYPE)-linux-$PACKAGE_VERSION.AppImage
WINDOWS_NAME_1=gobstones-$(commertialName $TYPE)-windows-$PACKAGE_VERSION.exe
WINDOWS32_NAME_1=gobstones-$(commertialName $TYPE)-windows-ia32-$PACKAGE_VERSION.zip
cp "./dist/gobstones-$(commertialName $TYPE)_$(echo $PACKAGE_VERSION)_linux_x86_64.AppImage" $LINUX_NAME_1
cd ./dist/win-ia32-unpacked ; zip -rq ../../$WINDOWS32_NAME_1 . ; cd ../..
cp "./dist/gobstones-$(commertialName $TYPE)_$(echo $PACKAGE_VERSION)_win.exe" $WINDOWS_NAME_1
mv "$LINUX_NAME_1" node_modules/
mv "$WINDOWS_NAME_1" node_modules/
mv "$WINDOWS32_NAME_1" node_modules/

# ---

TYPE="code"
echo "BUILDING '$TYPE' WITH ELECTRON..."
build

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_2=gobstones-$(commertialName $TYPE)-linux-$PACKAGE_VERSION.AppImage
WINDOWS_NAME_2=gobstones-$(commertialName $TYPE)-windows-$PACKAGE_VERSION.exe
WINDOWS32_NAME_2=gobstones-$(commertialName $TYPE)-windows-ia32-$PACKAGE_VERSION.zip
cp "./dist/gobstones-$(commertialName $TYPE)_$(echo $PACKAGE_VERSION)_linux_x86_64.AppImage" $LINUX_NAME_2
cd ./dist/win-ia32-unpacked ; zip -rq ../../$WINDOWS32_NAME_2 . ; cd ../..
cp "./dist/gobstones-$(commertialName $TYPE)_$(echo $PACKAGE_VERSION)_win.exe" $WINDOWS_NAME_2
mv "$LINUX_NAME_2" node_modules/
mv "$WINDOWS_NAME_2" node_modules/
mv "$WINDOWS32_NAME_2" node_modules/

# ---

TYPE="teacher"
echo "BUILDING '$TYPE' WITH ELECTRON..."
build

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_3=gobstones-$(commertialName $TYPE)-linux-$PACKAGE_VERSION.AppImage
WINDOWS_NAME_3=gobstones-$(commertialName $TYPE)-windows-$PACKAGE_VERSION.exe
WINDOWS32_NAME_3=gobstones-$(commertialName $TYPE)-windows-ia32-$PACKAGE_VERSION.zip
cp "./dist/gobstones-$(commertialName $TYPE)_$(echo $PACKAGE_VERSION)_linux_x86_64.AppImage" $LINUX_NAME_3
cd ./dist/win-ia32-unpacked ; zip -rq ../../$WINDOWS32_NAME_3 . ; cd ../..
cp "./dist/gobstones-$(commertialName $TYPE)_$(echo $PACKAGE_VERSION)_win.exe" $WINDOWS_NAME_3
mv "$LINUX_NAME_3" node_modules/
mv "$WINDOWS_NAME_3" node_modules/
mv "$WINDOWS32_NAME_3" node_modules/

# ---

mv "node_modules/$LINUX_NAME_1" "$LINUX_NAME_1"
mv "node_modules/$WINDOWS_NAME_1" "$WINDOWS_NAME_1"
mv "node_modules/$WINDOWS32_NAME_1" "$WINDOWS32_NAME_1"
mv "node_modules/$LINUX_NAME_2" "$LINUX_NAME_2"
mv "node_modules/$WINDOWS_NAME_2" "$WINDOWS_NAME_2"
mv "node_modules/$WINDOWS32_NAME_2" "$WINDOWS32_NAME_2"
mv "node_modules/$LINUX_NAME_3" "$LINUX_NAME_3"
mv "node_modules/$WINDOWS_NAME_3" "$WINDOWS_NAME_3"
mv "node_modules/$WINDOWS32_NAME_3" "$WINDOWS32_NAME_3"

# ---

echo "DEPLOYING DESKTOP VERSION $PACKAGE_VERSION..."

echo "PUBLISHING..."
./node_modules/.bin/publish-release --token $GITHUB_TOKEN --owner gobstones --repo gobstones-web-desktop --tag "$PACKAGE_VERSION" --name "$PACKAGE_VERSION" --assets $LINUX_NAME_1,$WINDOWS_NAME_1,$LINUX_NAME_2,$WINDOWS_NAME_2,$LINUX_NAME_3,$WINDOWS_NAME_3,$WINDOWS32_NAME_1,$WINDOWS32_NAME_2,$WINDOWS32_NAME_3 --notes "Gobstones Web - Desktop"

echo "DONE."
