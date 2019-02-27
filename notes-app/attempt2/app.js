// modules
const yargs = require('yargs');
const fs = require('fs');

// files
const notes = require('./notes.js');

// local vars
const titleOptions = {
    alias: 't',
    description: 'the title of your note, must be unique',
    required: true
};
const bodyOptions = {
    alias: 'b',
    description: 'the body of your note -- go wild!',
    required: true
}
const argv = yargs
    .command('list', 'list all notes')
    .command('add', 'add a note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'remove a note',{
        title: titleOptions
    })
    .command('read', 'access a single note',{
        title: titleOptions
    })
    .help()
    .argv;
const command = argv._[0];

// app structure

var actions = {
    // list notes
    list: () => {
        console.log('list called');
        var allNotes = notes.listNotes();
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach((note) => notes.logNote(note));
    },
    // add note
    add: () => {
        console.log('add called');
        var note = notes.addNote(argv.title, argv.body);
        if(note){
            console.log('note saved');
            notes.logNote(note);
        } else {
            console.log('ERROR: Note not saved. Try a different title.');
        }
    },
    // remove note
    remove: () => {
            var removed = notes.removeNote(argv.title);
            if (removed)
            console.log(`Note removed: "${removed}"`);
            else
            console.log('ERROR: Note not found.');
    },
    // read note
    read: () => {
        console.log('read called');
        var note = notes.readNote(argv.title);
        if (note) {
            console.log('Note found.');
            notes.logNote(note);
        } else {
            console.log(`No note with title ${argv.title} found.`);
        }
    },
    // missing command
    undefined: () => {
        console.log('undefined command called -- please include a command.');
    },
    // unknown command
    unknown: () => {
        console.log('unknown command called');
    }
}

// app init
if (actions[command])
actions[command](); // call the action if the command/action pair exists
else
actions['unknown'](); // otherwise call unknown command/action
