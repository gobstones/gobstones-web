#!/bin/bash

if ! which python >/dev/null; then
  echo 'The command "python" is required.'
  exit 1
fi

browser=google-chrome
if ! which 'google-chrome' > /dev/null; then
  browser=firefox
  if ! which 'firefox' > /dev/null; then
    echo 'The commands "google-chrome" or "firefox" are required.'
    exit 1
  fi
fi

BASE=3000
INCREMENT=1

port=$BASE
isfree=$(netstat -tapln | grep $port)

while [[ -n "$isfree" ]]; do
  port=$[port+INCREMENT]
  isfree=$(netstat -tapln | grep $port)
done

sleep 1 && eval "$browser http://localhost:$port" &
python -m SimpleHTTPServer $port
