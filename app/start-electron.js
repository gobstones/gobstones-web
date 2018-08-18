// Import required libraries
const yargs = require('yargs');
const start = require('./electron-runner');

let flags;

// Configure command line options to run the app in different modes
yargs
  .option('mode', {
    alias: 'm',
    description: 'The mode in which to start the program',
    type: 'string',
    choices: ['code', 'blocks', 'teacher']
  })

// Parse arguments of the app, fail if needed
yargs.parse(process.argv, (err, argv, out) => {
  if (err) {
    console.log(out)
    process.exit()  
  }
  flags = argv
})

start(flags.mode);
