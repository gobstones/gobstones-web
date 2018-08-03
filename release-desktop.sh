#!/bin/bash

echo "REMEMBER TO USE NODE 7 (nvm use 7) - ¿ARE YOU USING IT?"
read _NOTHING_

git pull

PACKAGE_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)`

cp package.json node_modules/
cp release-desktop.sh node_modules/
cp icon.png node_modules/
git branch -D electron
git checkout origin/gh-pages
git checkout -b electron
cp node_modules/package.json package.json
cp node_modules/release-desktop.sh release-desktop.sh
cp node_modules/icon.png icon.png

npm install
sed -i -e "s/'\.'/'\.\/resources\/app'/g" start-electron.js
mkdir build
mv icon.png build/

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

# ---

TYPE="blocks"
sed -i -e "s/-web/-jr/g" package.json
sed -i -e "s/Gobstones Web/Gobstones Jr/g" package.json

echo "BUILDING '$TYPE' WITH ELECTRON..."
./node_modules/.bin/electron-builder . gobstones-$(commertialName $TYPE) -wl

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_1=gobstones-$(commertialName $TYPE)-linux-$PACKAGE_VERSION.zip
WINDOWS_NAME_1=gobstones-$(commertialName $TYPE)-windows-$PACKAGE_VERSION.exe
cd ./dist/linux-unpacked ; zip -r ../../$LINUX_NAME_1 . ; cd ../..
cp "./dist/gobstones-$(commertialName $TYPE) Setup 1.0.0.exe" $WINDOWS_NAME_1
mv "$LINUX_NAME_1" node_modules/
mv "$WINDOWS_NAME_1" node_modules/

# ---

TYPE="code"
sed -i -e "s/\/#\/blocks/\/#\/code/g" start-electron.js
sed -i -e "s/-jr/-sr/g" package.json
sed -i -e "s/Gobstones Jr/Gobstones Sr/g" package.json

echo "BUILDING '$TYPE' WITH ELECTRON..."
./node_modules/.bin/electron-builder . gobstones-$(commertialName $TYPE) -wl

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_2=gobstones-$(commertialName $TYPE)-linux-$PACKAGE_VERSION.zip
WINDOWS_NAME_2=gobstones-$(commertialName $TYPE)-windows-$PACKAGE_VERSION.exe
cd ./dist/linux-unpacked ; zip -r ../../$LINUX_NAME_2 . ; cd ../..
cp "./dist/gobstones-$(commertialName $TYPE) Setup 1.0.0.exe" $WINDOWS_NAME_2
mv "$LINUX_NAME_2" node_modules/
mv "$WINDOWS_NAME_2" node_modules/

# ---

TYPE="teacher"
sed -i -e "s/\/#\/code/\/#\/teacher/g" start-electron.js
sed -i -e "s/-sr/-teacher/g" package.json
sed -i -e "s/Gobstones Sr/Gobstones Teacher/g" package.json

echo "BUILDING '$TYPE' WITH ELECTRON..."
./node_modules/.bin/electron-builder . gobstones-$(commertialName $TYPE) -wl

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_3=gobstones-$(commertialName $TYPE)-linux-$PACKAGE_VERSION.zip
WINDOWS_NAME_3=gobstones-$(commertialName $TYPE)-windows-$PACKAGE_VERSION.exe
cd ./dist/linux-unpacked ; zip -r ../../$LINUX_NAME_3 . ; cd ../..
cp "./dist/gobstones-$(commertialName $TYPE) Setup 1.0.0.exe" $WINDOWS_NAME_3
mv "$LINUX_NAME_3" node_modules/
mv "$WINDOWS_NAME_3" node_modules/

# ---

mv "node_modules/$LINUX_NAME_1" "$LINUX_NAME_1"
mv "node_modules/$WINDOWS_NAME_1" "$WINDOWS_NAME_1"
mv "node_modules/$LINUX_NAME_2" "$LINUX_NAME_2"
mv "node_modules/$WINDOWS_NAME_2" "$WINDOWS_NAME_2"
mv "node_modules/$LINUX_NAME_3" "$LINUX_NAME_3"
mv "node_modules/$WINDOWS_NAME_3" "$WINDOWS_NAME_3"

# ---

echo "DEPLOYING DESKTOP VERSION $PACKAGE_VERSION..."

echo "GIVE ME THE GITHUB TOKEN"
read TOKEN

echo "PUBLISHING..."
./node_modules/.bin/publish-release --token $TOKEN --owner gobstones --repo gobstones-web-desktop --tag "$PACKAGE_VERSION" --name "$PACKAGE_VERSION" --assets $LINUX_NAME_1,$WINDOWS_NAME_1,$LINUX_NAME_2,$WINDOWS_NAME_2,$LINUX_NAME_3,$WINDOWS_NAME_3 --notes "Gobstones Web - Desktop"

echo "DONE."
