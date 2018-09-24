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
    db.find();
}

function getNote(_id) {
    db.find(_id);
}

function createNote(note) {
    db.insert(note);
}

function editNote(note) {
    db.update(req.params._id, req.body);
}

function deleteNote(note) {
    db.remove(_id);
}