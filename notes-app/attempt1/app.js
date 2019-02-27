// Begin attempt to redo the notes app from memory

// global modules
const yargs = require('yargs'); // some npm package for parsing terminal commands
const _ = require('lodash');

// files
var notes = require('./notes.js');

// local
const titleOptions = {
    alias: 't',
    required: true
}
const bodyOptions = {
    alias: 'b',
    required: true
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Return a single note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];


// App Structure

var actions = {
    add : () => {
        var note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log('Note Added');
            notes.logNote(note);
        } else {
            console.log('Error: Note not added -- try a different title.');
        }
    },
    remove : () => {
        var removed = notes.removeNote(argv.title);
        if (removed) console.log(`Note "${argv.title}" removed`)
    },
    list : () => {
        var allNotes = notes.listNotes();
        console.log(`Printing ${allNotes.length} note(s)`);
        allNotes.forEach((note) => notes.logNote(note));
    },
    read : () => {
        var note = notes.getNote(argv.title);
        if (note) {
            console.log('Note Found');
            notes.logNote(note);
        }
    },
    unknown : () => {
        console.log(`"${command}" command not recognized. Please see --help for list of commands`);
    },
    undefined : () => {
        console.log("please include a command");
    }
}

// app init
var action = actions[command];
if (action) action();
else actions['unknown']();
