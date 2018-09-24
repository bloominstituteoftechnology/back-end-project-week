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
    return db('title');
}

function createNote(note) {
    db.insert('note');
}

function editNote(note) {
    db.update('note');
}

function deleteNote(note) {
    db.remove('note');
}