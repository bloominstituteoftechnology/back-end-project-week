const knex = require('knex');

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

module.exports = {
    getNotes,
    addNote,
    deleteNote,
}

function getNotes(id){
    if(id){
        return db('notes').where('id', id)
    } else {
        return db('notes')
    }
}

function addNote(note){
    return db('notes').insert(note)
}//returns in an array which may be interesting

function deleteNote(noteId){
    return db('notes').where('id', '=', noteId).del()
}