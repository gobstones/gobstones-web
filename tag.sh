#!/bin/bash

set -e

NEW_VERSION=$1
VERSION_REGEXP='[0-9]+\.[0-9]+\.[0-9]+'
FULL_VERSION_REGEXP="^${VERSION_REGEXP}$"

if [[ ! $NEW_VERSION =~ $FULL_VERSION_REGEXP ]]; then
  echo "First param should be a version like X.X.X"
  exit 1
fi

echo "[GobstonesWeb] Updating version..."
sed -i -r "s/\"version\": \"${VERSION_REGEXP}/\"version\": \"${NEW_VERSION}/" package.json

echo "[GobstonesWeb] Commiting files..."
git commit package.json -m "Welcome ${NEW_VERSION}!"

echo "[GobstonesWeb] Tagging $NEW_VERSION..."
git tag "${NEW_VERSION}"

echo "[GobstonesWeb] Pushing..."
git push origin HEAD --tags

echo "[GobstonesWeb] Pushed. Travis will do the rest"
