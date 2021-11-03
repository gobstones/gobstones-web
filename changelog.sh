#!/bin/bash

set -e

if ! [ -x "$(command -v github_changelog_generator)" ]; then
  echo 'github_changelog_generator not found!'
  echo ''
  echo 'Please install it running this command (requires Ruby) and try again:'
  echo '$ gem install github_changelog_generator'
  exit 1
fi

echo "[GobstonesWeb] Creating CHANGELOG..."
github_changelog_generator

echo "[GobstonesWeb] Commiting files..."
git add CHANGELOG.md
git commit -m "Updated CHANGELOG"

echo "[GobstonesWeb] Pushing..."
git push origin HEAD
