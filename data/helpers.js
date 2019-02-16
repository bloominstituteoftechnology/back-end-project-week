const db = require('./dbConfig');

module.exports = {
    getAll,
    insert,
    getById,
    deleteNote,
    editNote,
};

async function getAll() {
    let notes = await db('notes');
    let tags = await db('tags');
    console.log(tags);
    if (tags !== undefined) {
        tags.map(tag => {
            for (let i = 0; i < notes.length; i++) {
                if (tag.note_id === notes[i].id) {
                    notes[i] = Object.assign({}, 
                        notes[i], 
                        {"tags": {id: tag.id, note_id: tag.note_id, tags: JSON.parse(tag.tags)}});
                }
            }
        })
    }
    return notes;
}

async function insert(note) {
    let tagsPromise = undefined;

    const notePromise = new Promise((resolve, reject) => {
        const noteIds = db('notes').insert({title: note.title, content: note.title})
        resolve(noteIds);
        reject(noteIds);
    });

    if (note.tags) {
        notePromise.then(success => {
            tagsPromise = new Promise((resolve, reject) => {
                const noteId = success[0];
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
    console.log(`id: ${id}`)
    return db('notes').where('id', id).update({title: note.title, content: note.content})
}