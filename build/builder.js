const yargs = require('yargs');
const electronBuilder = require('electron-builder');

let flags = {};

yargs
  .option('mode', {
    alias: 'm',
    description: 'The mode in which to start the program',
    type: 'string',
    default: 'all',
    array: true,
    choices: ['all', 'full', 'code', 'blocks', 'teacher']
  })
  .option('platform', {
    alias: 'p',
    description: 'The platform to build for',
    type: 'string',
    array: true,
    choices: ['all', 'win', 'linux', 'mac']
  })
  .option('arch', {
    alias: 'a',
    description: 'The architecture to build for',
    type: 'string',
    array: true,
    choices: ['all', 'ia32', 'x64']
  })
  .option('dir', {
    alias: 'd',
    description: 'Only pack, but do not package for different platforms',
    default: false,
    type: 'boolean'
  })
  .option('publish', {
    alias: 'P',
    description: 'Package and publish in GitHub`s releases',
    default: false,
    type: 'boolean'
  })

// Parse the command line arguments
yargs.parse(process.argv, (err, argv, out) => {
    if (err) {
        console.log(out)
        process.exit()  
    }
    flags = argv
    })

// Standarize flags
if (flags.mode && flags.mode.includes('all')) {
    flags.mode = ['code', 'blocks', 'teacher']
}
if (flags.platform && flags.platform.includes('all')) {
    flags.platform = ['win', 'linux', 'mac']
}
if (flags.arch && flags.arch.includes('all')) {
    flags.arch = ['ia32', 'x64']
}

    
function commercialName(mode) {
    const names = {
        blocks: 'gobstones-jr',
        code: 'gobstones-sr',
        teacher: 'gobstones-teacher',
        full: 'gobstones'
    }
    return names[mode];
}
// Create the build configurations according to arguments
let configs = [];

// Set the appId and product name of each build target depending on the
// corresponding mode flag
for (mode of flags.mode) {
    let config = {
        config: {
            appId: 'org.gobstones.' + commercialName(mode),
            productName: commercialName(mode)
        }
    }
    if (mode !== 'full') {
        config.config.extraMetadata = {
            main: 'build/start-' + mode + '.js'
        }
        config.config.extraResources = [
            {
                from: 'build/start-' + mode + '.js',
                to: 'app/build/start-' + mode + '.js'
            }
        ]
    }
    configs.push(config);
}

// Add the correspondig platform
if (flags.platform) {
    for (i in configs) {
        configs[i].platforms = [];
        for (platform of flags.platform) {
            configs[i].platforms.push(platform);
        }
    }
}

// Add the4 corresponding architecture
if (flags.arch) {
    for (i in configs) {
        configs[i].archs = [];
        for (arch of flags.arch) {
            configs[i].archs.push(arch);
        }
    }
}

if (flags.dir) {
    for (i in configs) {
        configs[i].dir = true;
    }
}

if (flags.publish) {
    for (i in configs) {
        configs[i].publish = true;
    }
}

// Show the configuration loaded
console.log('About to build the application with the following configurations');
console.log('');
console.log(configs);
console.log('');

// Run all configurations sequentially. This can be inproved and run
// in a multi-threaded environment with Promise.all, but I skip it
// for now as it requires more RAM and CPU
function runConfig(i) {
    if (i >= configs.length) {
        process.exit();
    } else {
        electronBuilder.build(configs[i])
            .then((msg) => {
                console.log(msg);
                runConfig(i+1);
            })
            .catch((err) => {
                console.log(err);
                runConfig(i+1);
            })
    }
}

runConfig(0)
