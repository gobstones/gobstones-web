[![Build Status](https://travis-ci.org/gobstones/gobstones-web.svg?branch=master)](https://travis-ci.org/gobstones/gobstones-web)

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
# increase version in gw.appcache
rm -rf .tmp .publish dist
export TRAVIS_BRANCH=master
export TRAVIS_PULL_REQUEST=false
bash travis-runner.sh
```
## desktop/offline version

Gobstones Web uses HTML5 App Cache. This means that after the first time you visit the app, the next session will be cached and offline-ready. To clear cache, go to `chrome://appcache-internals/`

### with simple python server (recommended)

#### build
```bash
# requires makeself
git clone --depth 1 https://github.com/gobstones/gobstones-web -b gh-pages
cd gobstones-web
rm -rf .git gw.appcache
sed -i '$ d' index.js
makeself . gobstones-web.run "Gobstones Web" ./start-desktop.sh
```

#### run
```bash
./gobstones-web.run
```

### with electron

#### run locally
```bash
# requires electron
git branch -D electron
git checkout gh-pages
git pull
git checkout -b electron
sed -i '$ d' index.js
electron .
```

#### generate native distributable binaries
```bash
# requires electron-packager
git branch -D electron
git checkout gh-pages
git pull
git checkout -b electron
sed -i '$ d' index.js
sed -i -e "s/'\.'/'\.\/resources\/app'/g" start-electron.js
electron-packager . gobstones-web --pĺatform linux --arch x64
makeself ./gobstones-web-linux-x64 gobstones-web.run "Gobstones Web" ./gobstones-web
```

Single-file packages can be generated using [winrar](https://www.winrar.es/) (windows) and [makeself](https://github.com/megastep/makeself) (linux)

```bash
makeself build/gobstones-web/linux64 gobstones-web.run "Gobstones Web" ./gobstones-web
```

## more docs

Generated from **Polymer Starter Kit** -> [Read the docs!](https://github.com/gobstones/gobstones-web/blob/b3364b3afb34496da61dd129f27dd2ed4a915abb/README.md)
