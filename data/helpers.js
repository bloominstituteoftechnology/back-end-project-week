const db = require('./dbConfig');

module.exports = {
    getAll,
    insert,
    getById,
    deleteNote,
    editNote,
};

async function getAll() {
    return db('notes');
}

async function insert(note) {
    return db('notes').insert(note);
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