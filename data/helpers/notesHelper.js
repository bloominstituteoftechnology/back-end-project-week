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

// update the note at id, returns the record at id (updated or not) or 0 if id does not exist
async function updateNote(id, updates) {
    const note = await getNote(id);

    if (note.length) {
        const finalized = Object.assign({}, note[0], validateUpdates(updates));

        if (!isEquivalent(note[0], finalized)) {
            finalized.last_updated_at = Date();

            await db('notes').where('id', Number(id)).update(finalized);

            return await getNote(id);
        } else {
            return note[0];
        }
    } else {
        return 0;
    };
};

// delete the note at id, return number of records deleted
function removeNote(id) {
    return db('notes')
        .where('id', Number(id))
        .del();
};

// used in updateNote function
// returns validated object of updates
function validateUpdates(updates) {
    const valid = {};
    Object.getOwnPropertyNames(updates).forEach(key => {
        if (key === 'tags' && Array.isArray(updates[key])) {
            valid[key] = updates[key].join(',');
        };

        if ((key === 'title' && updates[key] !== '') || (key === 'textBody' && typeof updates[key] === 'string')) {
            valid[key] = updates[key];
        };
    });
    return valid;
};

// returns if two objects are equivalent
function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
};