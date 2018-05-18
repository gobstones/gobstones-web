#!/bin/bash

echo "REMEMBER TO USE NODE 7 (nvm use 7) - ¿ARE YOU USING IT?"
read _NOTHING_

echo "Type the build type you want (blocks or code, default: blocks)"
read TYPE

git pull

PACKAGE_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)`

cp package.json node_modules/
cp release-desktop.sh node_modules/
cp mslink.sh node_modules/
git branch -D electron
git checkout origin/gh-pages
git checkout -b electron
cp node_modules/package.json package.json
cp node_modules/release-desktop.sh release-desktop.sh
cp node_modules/mslink.sh mslink.sh

npm install
sed -i -e "s/'\.'/'\.\/resources\/app'/g" start-electron.js
if [ "$TYPE" == "code" ] ;
  sed -i -e "s/\/#\/blocks/\/#\/code/g" start-electron.js
fi

echo "BUILDING WITH ELECTRON..."
./node_modules/.bin/electron-builder . gobstones-web -wl

echo "CREATING ONE-FILE PACKAGES..."
LINUX_NAME=gobstones-web-linux-$PACKAGE_VERSION.zip
WINDOWS_NAME=gobstones-web-windows-$PACKAGE_VERSION.zip
# makeself ./dist/linux-unpacked $LINUX_NAME "Gobstones Web" ./gobstones-web
cd ./dist/linux-unpacked && zip -r ../../$LINUX_NAME . && cd ../..
cd ./dist/win-unpacked && zip -r ../../$WINDOWS_NAME . && cd ../..

echo "DEPLOYING DESKTOP VERSION $PACKAGE_VERSION..."

echo "GIVE ME THE GITHUB TOKEN"
read TOKEN

echo "PUBLISHING..."
./node_modules/.bin/publish-release --token $TOKEN --owner gobstones --repo gobstones-web-desktop --tag $PACKAGE_VERSION --name $PACKAGE_VERSION --assets $LINUX_NAME,$WINDOWS_NAME --notes "Gobstones Web - Desktop"

echo "DONE."


