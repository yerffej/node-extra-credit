// modules
const fs = require('fs');

// locals
var fetchNotes = () => {
    //
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

var saveNotes = (notes) => {
    //
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

var addNote = (title, body) => {
    //
    var notes = fetchNotes();
    var note = {
        title,
        body
    }
    var existing = notes.filter((note) => title === note.title);

    if (existing.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var listNotes = () => fetchNotes();

var getNote = (title) => {
    //
    var notes = fetchNotes();
    var note = notes.filter((note) => title === note.title)[0];
    return note;
}

var removeNote = (title) => {
    //
    var notes = fetchNotes();
    var remainingNotes = notes.filter((note) => title !== note.title);
    if(notes.length !== remainingNotes.length) {
        saveNotes(remainingNotes);
        return title;
    }
}

var logNote = (note) => {
    //
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

// exports
module.exports = {
    addNote,
    removeNote,
    getNote,
    listNotes,
    logNote
}
