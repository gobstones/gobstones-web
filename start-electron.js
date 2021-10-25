'use strict';

// Import required libraries
var yargs = require('yargs');
var start = require('./electron-runner');

var flags = void 0;

// Configure command line options to run the app in different modes
yargs.option('mode', {
  alias: 'm',
  description: 'The mode in which to start the program',
  type: 'string',
  choices: ['code', 'blocks', 'teacher']
});

// Parse arguments of the app, fail if needed
yargs.parse(process.argv, function (err, argv, out) {
  if (err) {
    console.log(out);
    process.exit();
  }
  flags = argv;
});

start(flags.mode);
//# sourceMappingURL=start-electron.js.map
