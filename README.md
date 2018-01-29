[![Build Status](https://travis-ci.org/gobstones/gobstones-web.svg?branch=master)](https://travis-ci.org/gobstones/gobstones-web)

# how to start
[See the wiki!](https://github.com/gobstones/gobstones-web/wiki/Manual-t%C3%A9cnico)

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

## adding dependencies
**Remember** to remove the `.tmp` and `dist` directories!

## deploy
This is hosted at Github Pages in:
- **staging**: http://gobstones.github.io/gobstones-web-staging
- **production**: http://gobstones.github.io/gobstones-web

Pushing to `master` will deploy to **staging** and creating new tags will deploy to **production**.

To deploy manually:
```bash
export GH_TOKEN="{your_username}:{your_password}"
./deploy.sh staging
# or ./deploy.sh production
```
## desktop/offline version

### with simple python server (recommended)

#### build
```bash
# requires makeself
git clone --depth 1 https://github.com/gobstones/gobstones-web -b gh-pages
cd gobstones-web
rm -rf .git
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
gulp
cd dist/
electron start-electron.js
```

#### generate native distributable binaries
```bash
./release-desktop.sh
```

Single-file packages can be generated using [winrar](https://www.winrar.es/) (windows) and [makeself](https://github.com/megastep/makeself) (linux)

## more docs

Generated from **Polymer Starter Kit** -> [Read the docs!](https://github.com/gobstones/gobstones-web/blob/b3364b3afb34496da61dd129f27dd2ed4a915abb/README.md)
