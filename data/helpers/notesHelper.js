const db = require('../dbConfig.js');

module.exports = {
    getNote,
    getNotes,
    addNote,
    updateNote,
    removeNote
};

// Get a note by note id
// returns array containing note object, empty array if id does not exist
function getNote(id) {
    return db('notes')
        .where({ id: id });
}

// return all notes in table (id parameter to filter by user_id)
function getNotes(user_id = null) {
    if (user_id) {
        return db('notes')
            .where({ user_id: user_id });
    } else {
        return db('notes');
    }
}

// adds note to table, returns new note id
function addNote(newNote, user_id) {
    newNote.user_id = user_id;

    return db('notes')
        .insert(newNote)
        .then(id => { return { id: id[0] } });
}

// update the note at id, returns the record at id (updated or not) or 0 if id does not exist
function updateNote(id, updates) {
    return db('notes')
        .where('id', Number(id))
        .update(updates);
};

// delete the note at id, return number of records deleted
function removeNote(id) {
    return db('notes')
        .where('id', Number(id))
        .del();
};

