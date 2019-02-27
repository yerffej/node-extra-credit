// ** Note functions ***

// modules
const fs = require('fs');

// local vars
const notesDataPath = 'notes-data.json';

// helper functions

var saveNotes = (notes) => {
    var notesString = JSON.stringify(notes);
    fs.writeFileSync(notesDataPath, notesString);
}

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync(notesDataPath);
        var notesJSON = JSON.parse(notesString);
        return notesJSON;
    } catch {
        return [];
    }
}

var logNote = (note) =>{
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}


// main action functions

var listNotes = () => {
    return fetchNotes();
}

var addNote = (title, body) => {
    var notes = [];
        notes = fetchNotes();

    var note = {
            title,
            body
        }
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length)
    return; // duplicate title exists, return undefined

    //otherwise save the new note and return true
    notes.push(note);
    saveNotes(notes);
    return note;
}

var removeNote = (title) => {
    var notes = [];
        notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    if (filteredNotes.length !== notes.length) {
        saveNotes(filteredNotes);
        return title; // returns true if the note was identified and removed
    }
}

var readNote = (title) => {
    var notes = [];
        notes = fetchNotes();
    var note = notes.filter((note) => note.title === title);

    if (note.length)
        return note[0]; // returns true if a note was found
}

// export methods

module.exports = {
    // add, read, etc...
    listNotes,
    addNote,
    removeNote,
    readNote,
    logNote
}
