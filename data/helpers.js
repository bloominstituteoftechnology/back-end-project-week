const db = require('./dbConfig');

module.exports = {
    getAll,
    insert,
    getById,
    deleteNote,
    editNote,
    reset,
};

async function getAll() {
    /* We need to get all the tables from both the notes and tags */
    let notes = await db('notes');
    let tags = await db('tags');
    /* If there are tags we have to place them with the correct notes. */
    if (tags !== undefined) {
        /* We're going to map through the tags... */
        tags.map(tag => {
            /* And go through the notes. */
            for (let i = 0; i < notes.length; i++) {
                /* And if we find the correct tag.note_id to the note.id. */
                if (tag.note_id === notes[i].id) {
                    /* We then assign the tags to that note. */
                    notes[i] = Object.assign({}, 
                        notes[i], 
                        {"tags": JSON.parse(tag.tags)});
                }
            }
        })
    }
    return notes;
}

async function insert(note) {
    let tagsPromise = undefined;

    /* We setup a new promise to create a new note. Because this has to run and complete first before we can get a note id to attach tags to.  */
    const notePromise = new Promise((resolve, reject) => {
        const noteIds = db('notes').insert({title: note.title, content: note.content})
        resolve(noteIds);
        reject(noteIds);
    });

    /* If the note has tags */
    if (note.tags) {
        /* We have to wait for the insertion of the note into the database to get our note id */
        notePromise.then(success => {
            tagsPromise = new Promise((resolve, reject) => {
                /* Since db().insert() returns an array of ids for objects inserted and we're only inserting one object let's get the first one */
                const noteId = success[0];
                /* Insert the tags with the correct note id. We stringify it to make sure it's correctly placed into the database table. */
                const tagsId = db('tags').insert({note_id: noteId, tags: JSON.stringify(note.tags)});
                resolve(tagsId);
                reject(tagsId);
            });
        })
    
        return {noteId: await notePromise, tagsId: await tagsPromise};
    }

    else {
        return await notePromise
    }
}

async function getById(id) {
    return db('notes').where('id', id);
}

async function deleteNote(id) {
    return db('notes').where('id', id).del();
}

async function editNote(id, note) {
    /* Just a quick update by checking the database for the id and when it matches updating the table. */
    const noteChanged = await db('notes').where('id', id).update({title: note.title, content: note.content})
    /* Same thing as with tags but instead of checking for the tags by id we match them by the note_id. */
    await db('tags').where('note_id', id).update({tags: JSON.stringify(note.tags)});
    return noteChanged;
}

async function reset() {
    /* Quick helper function to clear out the database. Definitely wouldn't have this on a production server. */
    await db('notes').truncate();
    await db('tags').truncate();
    return 1;
}