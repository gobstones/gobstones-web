#!/bin/bash

set -e

NEW_VERSION=$1
VERSION_REGEXP='[0-9]+\.[0-9]+\.[0-9]+'
FULL_VERSION_REGEXP="^${VERSION_REGEXP}$"

if [[ ! $NEW_VERSION =~ $FULL_VERSION_REGEXP ]]; then
  echo "First param should be a version like X.X.X"
  exit 1
fi

echo "[Gobstones::Board] Updating version..."
sed -i -r "s/\"version\": \"${VERSION_REGEXP}/\"version\": \"${NEW_VERSION}/" package.json
sed -i -r "s/\"version\": \"${VERSION_REGEXP}/\"version\": \"${NEW_VERSION}/" bower.json
sed -i -r "s/VERSION = \"${VERSION_REGEXP}/VERSION = \"${NEW_VERSION}/" gem/lib/gobstones/board/version.rb

echo "[Gobstones::Board] Generating dist..."
grunt dist

echo "[Gobstones::Board] Commiting files..."
git commit dist package.json bower.json gem/lib/gobstones/board/version.rb -m "Welcome ${NEW_VERSION}!"

echo "[Gobstones::Board] Tagging $NEW_VERSION..."
git tag "${NEW_VERSION}"

echo "[Gobstones::Board] Pushing..."
git push origin HEAD --tags

echo "[Gobstones::Board] Pushed. Travis will do the rest"
