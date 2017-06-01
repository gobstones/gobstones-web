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
This is hosted at Github Pages in:
- **staging**: http://gobstones.github.io/gobstones-web-staging
- **staging**: http://gobstones.github.io/gobstones-web

Pushing to `master` will deploy to **staging** and creating new tags will deploy to **production**.

To deploy manually:
```bash
rm -rf .tmp dist
export GH_TOKEN="{your_username}:{your_password}"
bash deploy.sh staging
# or bash deploy.sh production
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
current_branch=$(git branch | grep \* | cut -d ' ' -f2)
git branch -D electron
git checkout gh-pages
git pull
git checkout -b electron
sed -i '$ d' index.js
electron .
git checkout -f "$current_branch"
```

#### generate native distributable binaries
```bash
# requires electron-packager
current_branch=$(git branch | grep \* | cut -d ' ' -f2)
git branch -D electron
git checkout gh-pages
git pull
git checkout -b electron
sed -i '$ d' index.js
sed -i -e "s/'\.'/'\.\/resources\/app'/g" start-electron.js
electron-packager . gobstones-web --pĺatform linux --arch x64
makeself ./gobstones-web-linux-x64 gobstones-web.run "Gobstones Web" ./gobstones-web
git checkout -f "$current_branch"
```

Single-file packages can be generated using [winrar](https://www.winrar.es/) (windows) and [makeself](https://github.com/megastep/makeself) (linux)

```bash
makeself build/gobstones-web/linux64 gobstones-web.run "Gobstones Web" ./gobstones-web
```

## more docs

Generated from **Polymer Starter Kit** -> [Read the docs!](https://github.com/gobstones/gobstones-web/blob/b3364b3afb34496da61dd129f27dd2ed4a915abb/README.md)
