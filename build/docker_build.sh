#!/bin/sh

INTERACTIVE="i"
RUN="/bin/bash"
COMMAND="$1"

if [ -n "$COMMAND" ]; then
    INTERACTIVE=""
    RUN="$COMMAND"
fi

docker run --rm -t$INTERACTIVE \
    --env ELECTRON_CACHE="/root/.cache/electron" \
    --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
    -v ${PWD}:/project \
    -v ~/.cache/electron:/root/.cache/electron \
    -v ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/builder:wine \
    /bin/bash -c "$RUN"
