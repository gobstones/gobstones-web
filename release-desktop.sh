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

# ---

TYPE="blocks"

echo "BUILDING '$TYPE' WITH ELECTRON..."
mkdir build
mv icon.png build/
./node_modules/.bin/electron-builder . gobstones-web -wl

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_1=gobstones-$TYPE-linux-$PACKAGE_VERSION.zip
WINDOWS_NAME_1=gobstones-$TYPE-windows-$PACKAGE_VERSION.exe
cd ./dist/linux-unpacked ; zip -r ../../$LINUX_NAME_1 . ; cd ../..
cp "./dist/gobstones-web Setup 1.0.0.exe" $WINDOWS_NAME_1

# ---

TYPE="code"
sed -i -e "s/\/#\/blocks/\/#\/code/g" start-electron.js

echo "BUILDING '$TYPE' WITH ELECTRON..."
mkdir build
mv icon.png build/
./node_modules/.bin/electron-builder . gobstones-web -wl

echo "CREATING '$TYPE' ONE-FILE PACKAGES..."
LINUX_NAME_2=gobstones-$TYPE-linux-$PACKAGE_VERSION.zip
WINDOWS_NAME_2=gobstones-$TYPE-windows-$PACKAGE_VERSION.exe
cd ./dist/linux-unpacked ; zip -r ../../$LINUX_NAME_2 . ; cd ../..
cp "./dist/gobstones-web Setup 1.0.0.exe" $WINDOWS_NAME_2

# ---

echo "DEPLOYING DESKTOP VERSION $PACKAGE_VERSION..."

echo "GIVE ME THE GITHUB TOKEN"
read TOKEN

echo "PUBLISHING..."
./node_modules/.bin/publish-release --token $TOKEN --owner gobstones --repo gobstones-web-desktop --tag "$PACKAGE_VERSION" --name "$PACKAGE_VERSION" --assets $LINUX_NAME_1,$WINDOWS_NAME_1,$LINUX_NAME_2,$WINDOWS_NAME_2 --notes "Gobstones Web - Desktop"

echo "DONE."


