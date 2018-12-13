const db = require('../data/db.js');

module.exports = {
    getNotes,
    createNote,
    viewNote,
    editNote,
    deleteNote,
    getUsers

}

function getNotes(id) {
    return db('notes')
    .where('user_id', '=', id)
}

function createNote(note) {
    return db('notes')
    .insert(note)
    .returning('id')
}

function viewNote(id) {
    return db('notes')
    .where('id', '=', id)
}

function editNote(post, id) {
    return db('notes')
    .where('id', '=', id)
    .update(post)
}

function deleteNote(id) {
    return db('notes')
    .where('id', '=', id)
    .del();
}

function getUsers() {
    return db('users')
}