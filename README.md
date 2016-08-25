# gobstones-web

This is a web IDE of the language [Gobstones](http://gobstones.github.io).

## install
```bash
sudo npm install -g bower gulp
npm install && bower install
```

## run server
```bash
npm start
```

## run tests
```bash
gulp jasmine
```

## deploy
This is hosted at Github Pages in http://gobstones.github.io/gobstones-web

To deploy manually:
```bash
rm -rf .tmp .publish dist
export TRAVIS_BRANCH=master
export TRAVIS_PULL_REQUEST=false
bash travis-runner.sh
```
## offline version (node-webkit)

### run locally
```bash
# (1) install node-webkit
sudo npm install -g nw

# (2) create a branch from the #gh-pages code base
git checkout -b nw
git branch --set-upstream-to=origin/gh-pages nw
git checkout nw
git pull

# (3) remove enforce HTTPS feature
sed -i '$ d' index.js

# (4) pack the app
zip -r gobstones-web.nw *

# (4) run!
nw gobstones-web.nw

# (6) clean things
git checkout -- index.js
rm gobstones-web.nw
```

### generate native distributable binaries
The previous steps (1), (2), and (3) are pre-conditions.
```bash
./node_modules/nw-builder/bin/nwbuild --platforms win32,win64,linux32,linux64 .
# the output is in /build
```

## more docs

Generated from **Polymer Starter Kit** -> [Read the docs!](https://github.com/gobstones/gobstones-web/blob/b3364b3afb34496da61dd129f27dd2ed4a915abb/README.md)
