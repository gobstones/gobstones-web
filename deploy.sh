#!/bin/bash

function try {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
      echo "!!!Error!!! with $1" >&2
      exit $status
  fi
  return $status
}

# build
rm -rf .tmp dist
try gulp

# config
ENVIRONMENT="$1"
SUFFIX="-staging"
REMOTE="staging"
if [ "$ENVIRONMENT" == "production" ]; then
  SUFFIX=""
  REMOTE="origin"
fi

echo "Deploying to gobstones-web$SUFFIX (remote $REMOTE)..."

# push to gh pages
current_branch=$(git branch | grep \* | cut -d ' ' -f2)
echo "Deleting temporary things..."
git branch -D deploy
git branch -D tmp-deploy
git remote remove $REMOTE
echo "Creating deploy commit..."
try git checkout -b deploy
try git add -Af dist/
try git commit -m "Deploy @ $(date +'%d/%m/%Y')"
echo "Creating deploy subtree commit..."
try git subtree split --prefix dist deploy -b tmp-deploy
echo "Pushing to remote..."
try git remote add $REMOTE "https://github.com/gobstones/gobstones-web$SUFFIX.git"
try git push -f $REMOTE tmp-deploy:gh-pages
git checkout "$current_branch"
