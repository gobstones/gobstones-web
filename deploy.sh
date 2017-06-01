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
if [ "$ENVIRONMENT" == "production" ]; then
  SUFFIX=""
fi

# push to gh pages
current_branch=$(git branch | grep \* | cut -d ' ' -f2)
git branch -D deploy
git branch -D tmp-deploy
git remote remove staging
git remote add staging https://$GH_TOKEN@github.com/gobstones/gobstones-web$SUFFIX
echo "Deploying to environment '$ENVIRONMENT'..."
try git checkout -b deploy
try git add -Af dist/
try git commit -m "Deploy @ $(date +'%d/%m/%Y')"
try git subtree split --prefix dist deploy -b tmp-deploy
try git push -f staging tmp-deploy:gh-pages
try git checkout "$current_branch"
