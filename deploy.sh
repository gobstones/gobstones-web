#!/bin/bash

function try {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
      echo "!!!Error!!! with $1" >&2
      exit $?
  fi
  return $status
}

# build
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
echo "Deleting temporary branches..."
git branch -D deploy
git branch -D tmp-deploy
echo "Adding remote..."
git remote remove staging
git remote add staging https://$GH_TOKEN@github.com/gobstones/gobstones-web$SUFFIX
echo "Creating deploy commit..."
try git checkout -b deploy
try git add -Af dist/
try git commit -m "Deploy @ $(date +'%d/%m/%Y')"
echo "Creating deploy subtree commit..."
try git subtree split --prefix dist deploy -b tmp-deploy
echo "Pushing to remote..."
try git push -f $REMOTE tmp-deploy:gh-pages
try git checkout "$current_branch"
