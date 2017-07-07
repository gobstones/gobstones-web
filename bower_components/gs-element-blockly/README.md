# \<gs-element-blockly\>

Element providing Blockly interface for Gobstones Web

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.

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
