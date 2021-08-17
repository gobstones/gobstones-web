![Build status](https://github.com/gobstones/gobstones-web/actions/workflows/test-deploy.yml/badge.svg?branch=master)

Gobstones Web
=============

Gobstones Web is the latest development for a full featured IDE for the programming language [Gobstones](http://gobstones.github.io).

Gobstones is a language specifically built to teach computer science, and works for kids in high-schools to introductory lessons in university courses.

This IDE is built with electron and polymer, which allows it to be run both online and offline.

The application comes in three flavors:
* **Gobstones Jr**: An IDE for the youngest. It allows you to code by dragging and dropping blocks on the screen.

* **Gobstones Sr**: A more advanced IDE with full text code. It allows you to code by writing sentences on a text editor.

* **Gobstones Teacher**: Crafted for the teachers, allowing them to create their own guides and exercises.

Application URLs
================

This project is hosted online at
* [https://gobstones.github.io/gobstones-web](https://gobstones.github.io/gobstones-web)
* [https://gobstones.github.io/gobstones-web-staging](https://gobstones.github.io/gobstones-web-staging)

You can test the different flavors of the app at:

* [https://gobstones.github.io/gobstones-jr](https://gobstones.github.io/gobstones-jr)
* [https://gobstones.github.io/gobstones-sr](https://gobstones.github.io/gobstones-sr)
* [https://gobstones.github.io/gobstones-teacher](https://gobstones.github.io/gobstones-teacher)

How to run this project
=======================

[Check out the docs!](https://github.com/gobstones/gobstones-web/wiki/Manual-t%C3%A9cnico)

If you want to run the code you will need to install project dependencies first.
Make sure you have Node.js version 7.x or above installed and correctly configured in your system.
Clone the repository on your system and open a terminal in the project's directory.

## prepare the application and dependencies

```bash
npm install --global yarn # install yarn, the package manager
git update-index --assume-unchanged app/config.json # ignore config changes in VCS
```

And then install all project dependecies
```bash
yarn install
```

## run server in development mode

```bash
yarn dev
```

## run as a local application with electron

```bash
yarn start
```

## run tests
```bash
yarn test
```

## adding dependencies
**Remember** to remove the `.tmp` and `dist` directories!

## build a desktop/offline version

#### building for your current platform
You can build for your current platform and operating system by running the
following command:

```bash
yarn build
```

#### building for a different platform
If you want to build for other platforms you may run
```bash
yarn dist
```
*dist* will perform exactly like build, but you can pass custom command line arguments
as follows:


| argument     |   description    |
|--------------|------------------------------|
| --help       |   FLAG: Show command help    |
| --version    |   Show version number        |
| --mode, -m   | The mode in which to start the program. Available options include "all", "full", "code","blocks", "teacher". Defaults to "full. |
| --platform, -p | The platform to build for. Available options include "all", "freebsd", "linux", "mac", "win". Default to the users OS |
| --arch, -a | The architecture to build for. Available options include "all", "x64", "ia32". Defaults to users architecture. |
| --target, -t | The target package to build for. Avaiable options include "all", For Linux "AppImage", "deb", "rpm", "pacman", For Mac "app", "dmg", For Windows "nsis", "portable". Default's to "all". |
| --publish, -P | Package and publish in GitHub`s releases |
| --verbose, -v |  Print additional information when running |

So, for example if you wan to build for Windows 32 bits you may run
```bash
yarn dist -p win -a ia32
```

If you want to build deb packages for Linux both 32 and 64 bits, you may run
```bash
yarn dist -p linux -t deb -a all
```

If you wish to build for all platforms, run 
```bash
yarn dist:all
```
You may add the mode to that last command if you wish.

#### requirements for building for different platforms

Builing for different platforms works best when running on a linux
host. Several packages are required to be installed on the system
in order to build different targets.

If you are planning to build for multiple targets consider installing the following dependencies:

* dpkg --add-architecture i386
* wine
* wine32
* mono-complete
* dpkg
* rpm
* bsdtar

You should also perform a chmod to a file
```bash
chmod +x node_modules/zip-bin/compress.sh
```

After that you may build as described above.

#### Build using docker

Docker allows you to build the application for several architectures without installing all the dependencies.
This is the recommended way.

You need to have docker installed and running to perform this. Once installed, just run:

```bash
yarn dist:docker
```

After downloading the images, the terminal on the docker container will be open and you may build for any architecture and platform, or to all by running

```bash
yarn dist:all
```

## deploying

This project is hosted on GitHub Pages. Pushing to `master` will deploy to **staging** and creating new tags will deploy to **production**.

To deploy manually:
```bash
# update version in package.json and about-gobstones.html
export GH_TOKEN="{your_username}:{your_password}"
./deploy.sh staging
# or ./deploy.sh production
```
