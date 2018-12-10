const db = require('../dbConfig.js');

module.exports = {
    getNotes,
    addNote
};

// return all notes in table
function getNotes() {
    return db('notes');
}
// adds note to table, returns new note id
function addNote(newNote, user_id) {
    newNote.user_id = user_id;
    
    if (newNote.tags) {
        newNote.tags = newNote.tags.join(',');
    } else {
        newNote.tags = '';
    }

    return db('notes')
        .insert(newNote)
        .then(id => { return { id: id[0] } });
}