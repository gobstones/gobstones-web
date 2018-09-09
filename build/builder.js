const yargs = require('yargs');
const electronBuilder = require('electron-builder');
const fs = require('fs')

// Get global data from system
const CurrentSystem = {}

switch(process.platform) {
    case 'darwin': CurrentSystem.OS = 'mac'; break;
    case 'linux': CurrentSystem.OS = 'linux'; break;
    case 'win32': CurrentSystem.OS = 'win'; break;
    case 'freebsd': CurrentSystem.OS = 'freebsd'; break;
    default: CurrentSystem.OS = 'other';
}

switch(process.arch) {
    case "ia32": CurrentSystem.ARCH = "ia32"; break;
    case "x32": CurrentSystem.ARCH = "ia32"; break;
    case "x64": CurrentSystem.ARCH = "x64"; break;
    default: CurrentSystem.ARCH = "other";
}

CurrentSystem.IS_DOCKER = false;
if (fs.existsSync('/proc/1/cgroup')) {
    CurrentSystem.IS_DOCKER = fs.readFileSync('/proc/1/cgroup', {encoding: 'utf8'}).includes('docker')
}

// Configure general data
const AVAILABLE_ARCHS = ['x64', 'ia32'];
const AVAILABLE_PLATFORMS = ['freebsd', 'linux', 'mac', 'win'];
const AVAILABLE_TARGETS = {
    linux: ['AppImage', 'deb', 'rpm', 'pacman'],
    mac: ['mac', 'dmg'],
    win: ['nsis', 'portable'],
    freebsd: ['freebsd']
}
const AVAILABLE_MODES = ['full', 'code', 'blocks', 'teacher']

// A set of rules to avoid invalid configurations on different platforms
const EXCLUSSION_RULES = [
    // 
    (configs) => {
        // Mac only supports 64 bits architecture, remove 32 bit possibilities
        if (configs.mac) {
            if (configs.mac.includes('dmg:ia32')) {
                configs.mac.splice(configs.mac.indexOf('dmg:ia32'), 1)
            }
            if (configs.mac.includes('app:ia32')) {
                configs.mac.splice(configs.mac.indexOf('app:ia32'), 1)
            }
        }
        return configs;
    },
    (configs) => {
        // Mac DMGs can only be built on a mac, so avoid it if running on another platform
        if (CurrentSystem.OS !== 'mac' && configs.mac) {
            if (configs.mac.includes('dmg:x64')) {
                configs.mac.splice(configs.mac.indexOf('dmg:x64'), 1)
            }
        }
        return configs;
    },
    (configs) => {
        // RPMs cannot seem to be built with standard docker image, remove them if running
        // on docker
        if (CurrentSystem.IS_DOCKER && configs.linux) {
            if (configs.linux.includes('rpm:x64')) {
                configs.linux.splice(configs.mac.indexOf('rpm:x64'), 1)
            }
            if (configs.linux.includes('rpm:ia32')) {
                configs.linux.splice(configs.mac.indexOf('rpm:ia32'), 1)
            }
        }
        return configs;
    }
]


// Process CLI Arguments
let flags = {};

yargs
  .option('mode', {
    alias: 'm',
    description: 'The mode in which to start the program',
    type: 'string',
    default: 'full',
    array: true,
    choices: ['all'].concat(AVAILABLE_MODES)
  })
  .option('platform', {
    alias: 'p',
    description: 'The platform to build for',
    type: 'string',
    array: true,
    choices: ['all'].concat(AVAILABLE_PLATFORMS)
  })
  .option('arch', {
    alias: 'a',
    description: 'The architecture to build for',
    type: 'string',
    array: true,
    choices: ['all'].concat(AVAILABLE_ARCHS)
  })
  .option('target', {
    alias: 't',
    description: 'The target package to build for',
    type: 'string',
    array: true,
    choices: ['all'].concat(AVAILABLE_TARGETS.linux).concat(AVAILABLE_TARGETS.mac).concat(AVAILABLE_TARGETS.win)
  })
  .option('publish', {
    alias: 'P',
    description: 'Package and publish in GitHub`s releases',
    default: false,
    type: 'boolean'
  })
  .option('verbose', {
    alias: 'v',
    description: 'Print additional information',
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

if (flags.help) {
    yargs.showHelp()
    process.exit() 
}

// Standarize flags
if (flags.mode && flags.mode.includes('all')) {
    flags.mode = AVAILABLE_MODES;
}
if (flags.platform && flags.platform.includes('all')) {
    flags.platform = AVAILABLE_PLATFORMS
}
if (flags.arch && flags.arch.includes('all')) {
    flags.arch = AVAILABLE_ARCHS
}
if (!flags.platform) {
    flags.platform = [CurrentSystem.OS]
}
if (!flags.arch) {
    flags.arch = [CurrentSystem.ARCH]
}
if (!flags.target || flags.target.includes('all')) {
    flags.target = []
    for (platform of flags.platform) {
        flags.target = flags.target.concat(AVAILABLE_TARGETS[platform])
    }
}
if (flags.platform.includes('freebsd')) {
    flags.platform.splice(flags.platform.indexOf('freebsd'), 1)
    if (!flags.platform.includes('linux')) {
        flags.platform.push('linux')
    }
    if (!flags.target.includes('freebsd')) {
        flags.target.push('freebsd')
    }
}

/*
console.log(flags)
console.log(perPlatformTarget('win', flags.target, flags.arch))
console.log(perPlatformTarget('mac', flags.target, flags.arch))
console.log(perPlatformTarget('linux', flags.target, flags.arch))
process.exit();
*/

// Custom function for generating the building configuration
function commercialName(mode) {
    const names = {
        blocks: 'gobstones-jr',
        code: 'gobstones-sr',
        teacher: 'gobstones-teacher',
        full: 'gobstones'
    }
    return names[mode];
}

function perPlatformTarget(platform, targets, archs) {
    let perPlatform = AVAILABLE_TARGETS[platform].filter(e => targets.includes(e));
    if (platform === 'linux' && targets.includes('freebsd')) {
        perPlatform.push('freebsd');
    }
    let withArchs = [];
    for (arch of archs) {
        withArchs = withArchs.concat(perPlatform.map(e => e + ':' + arch))
    }
    return withArchs;
}

function createConfigPerPlatform(platforms, targets, archs) {
    let configs = []
    for (platform of platforms) {
        configs.push({})
        configs[configs.length-1][platform] =
            perPlatformTarget(platform, targets, archs)
    }
    return configs;
}

function configForMode(configs, modes) {
    let allNewConfs = [];
    for (mode of modes) {
        for (config of configs) {
            let newConf = Object.assign({config : {
                appId: 'org.gobstones.' + commercialName(mode),
                productName: commercialName(mode)
            }}, config);
            if (mode !== 'full') {
                newConf.config.extraMetadata = {
                    main: 'build/start-' + mode + '.js'
                }
                newConf.config.extraResources = [
                    {
                        from: 'build/start-' + mode + '.js',
                        to: 'app/build/start-' + mode + '.js'
                    }
                ]
            }
            allNewConfs.push(newConf);
        }
    }
    return allNewConfs;
}

function configForPublishing(configs, publish) {
    if (!publish) { return configs; }
    for (config of configs) {
        config.publish = publish
    }
    return configs;
}

function applyExcludeRules(configs) {
    for (RULE of EXCLUSSION_RULES) {
        configs = RULE(configs)
    }
    return configs;
}

function generateConfig(flags) {
    // Change this for something prettier later
    let configurations = createConfigPerPlatform(flags.platform, flags.target, flags.arch)
    configurations = configForMode(configurations, flags.mode)
    configurations = configForPublishing(configurations, flags.publish)
    configurations = applyExcludeRules(configurations)
    return configurations;
}

// Pretty print a configuration for verbose mode
function prettyConfig(config) {
    let platform = config['linux'] ? 'linux' : config['mac'] ? 'mac' : 'win';
    return '    Configuration:\n' +
        `      name: ${config.config.productName}\n` +
        `      platform: ${platform}\n` +
        `      targets: ${config[platform]}`;
}

function prettyConfigList(configs) {
    let pretty = 'Configuration list:\n';
    for (config of configs) {
        pretty += prettyConfig(config) + '\n'
    }
    return pretty;
}

function printConfiguration(configs, verbose) {
    if (verbose) {
        console.log('\nAbout to build the application with the following configurations:\n');
        console.log(prettyConfigList(configs))
    }
}

// Run all the configurations created
function runConfigurations(configs) {
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
}


let configs = generateConfig(flags);
printConfiguration(configs, flags.verbose);
runConfigurations(configs);
