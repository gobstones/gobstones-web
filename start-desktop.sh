#!/bin/bash

if ! which python >/dev/null; then
  echo 'The command "python" is required.'
  exit 1
fi

if ! which 'google-chrome' > /dev/null; then
  echo 'The command "google-chrome" is required.'
  exit 1
fi

python -m SimpleHTTPServer 6085 &
google-chrome --app=http://localhost:6085
