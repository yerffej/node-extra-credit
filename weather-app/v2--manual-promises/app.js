// weather app using promises

// steps

// setup yargs
// use basic promise syntax to make the two api calls
const yargs = require('yargs');

const argv = yargs.
    options({
        'address':{
            alias: 'a',
            demand: true,
            type: 'string',
            description: 'the address for requesting the weather'
        }
    })
    .help()
    .argv;

console.log(argv);
