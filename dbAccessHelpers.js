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
    db('notes');
}

function getNote(_id) {
    db('notes')
        .where('_id', '=', _id);
}

function createNote(note) {
    db('notes')
        .insert(note);
}

function editNote(note) {
    db('notes')
        .where('_id', '=', _id)
        .update(note);
}

function deleteNote(note) {
    db('notes')
        .where('_id', '=', _id)
        .del(note);
}