const db = require('../dbConfig.js');

module.exports = {
    getNote,
    getNotes,
    addNote,
    updateNote,
    removeNote
};

// return note with given id
function getNote(id) {
    return db('notes')
        .where({ id: id });
}

// return all notes in table (id parameter to filter by user_id)
function getNotes(id = null) {
    if (id) {
        return db('notes')
            .where({ user_id: id });
    } else {
        return db('notes');
    }
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

// update the note at id, return the number of records updated
async function updateNote(id, updates) {
    const note = await getNote(id);

    if (updates.tags) {
        updates.tags = updates.tags.join(',');
    }

    if (note.length) {
        const updated = Object.assign(note[0], updates);
        delete updated.id;
    } else {
        return 0;
    }

    return db('notes')
        .where('id', Number(id))
        .update(updated);
};

// delete the note at id, return number of records deleted
function removeNote(id) {
    return db('notes')
        .where('id', Number(id))
        .del();
};