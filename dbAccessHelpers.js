const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

module.exports = {
    getNotes,
    getNote,
    createNote,
    editNote,
    deleteNote,
};

function getNotes() {
    return db('notes');
}

function getNote(_id) {
    return db('notes')
            .where('_id', '=', _id);
}

function createNote(note) {
    return db('notes')
            .insert(note);
}

function editNote(_id, note) {
    return db('notes')
            .where('_id', '=', _id)
            .update(_id, note);
}

function deleteNote(_id) {
    return db('notes')
            .where('_id', '=', _id)
            .del();
}