# \<gs-element-blockly\>

Element providing Blockly interface for Gobstones Web

## Install Development Environment

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and Bower installed. 

```Bash
$ npm install -g bower
$ npm install -g polymer-cli
```

Then, run `bower install`

## Viewing Your Application

```
$ polymer serve
```

Despues de correr el comando visitar http://localhost:8080/components/gs-element-blockly/

![](screenshots/doc.png)

Y hacer click en el botón de arriba a la derecha "demo"

![](screenshots/demo.png)

## Building Your Application

```
$ polymer build
```

This will create a `build/` folder with `bundled/` and `unbundled/` sub-folders
containing a bundled (Vulcanized) and unbundled builds, both run through HTML,
CSS, and JS optimizers.

You can serve the built versions by giving `polymer serve` a folder to serve
from:

```
$ polymer serve build/bundled
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

## Deploy Demo to Program-AR.github.io/gs-element-blockly

Just create a folder and run gp.sh with parameters:

```bash
mkdir temp
cd temp
../gp.sh Program-AR gs-element-blockly dev
cd ..
rm -rf temp
```

or simply execute ./deploy-gh-pages.sh

## Gem wrapper

This module can also be deployed a ruby gem. `gobstones-blockly` works with Ruby 2.3.1

```bash
cd gem
rake wrapper:wrap
bundle install
bundle exec rspec
```

## Building

This command will build a minified .html file with all included:

```bash
./build.sh
```

## Tagging and releasing

```bash
./tag.sh
```