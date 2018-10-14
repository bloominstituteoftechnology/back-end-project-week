const knex = require('knex');

const dbEngine = process.env.DB || 'development';

const dbConfig = require('../knexfile.js')[dbEngine];

// const dbConfig = require('../knexfile');

const db = knex(dbConfig);

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    editNote,
    addUser,
    getUser,
    getNote,
    checkUser
}

function getNotes(userid){
    return db('notes').where('userid', userid).andWhere('isDeleted', false)
}

function getNote(userid, id){
    return db('notes').where('userid', userid).andWhere('id', id)
}

function addNote(note){
    return db('notes').insert(note)
}//returns in an array which may be interesting

function deleteNote(noteId){
    return db('notes').where('id', '=', noteId).del()
}

//new and untested
function deleteNoteAndChildren(noteId){
    return db('notes').where('id', '=', noteId).del()
    //and where parent id = noteId - delete 
}

//new and untested
function deleteNoteModifyChildren(noteId){
    return db('notes').where('id', '=', noteId).del()
    //and (where parentid = noteID) change parentid to null or noteId's parent id
}

function editNote(editId, newNote){
    return db('notes').where('id', editId).update(newNote)
}

function editNote(editId, newNote){
    return db('notes').where('id', editId).update(newNote)
}

function addUser(newUser){
    return db('users').insert(newUser).returning('id')
}

function getUser(userid){
    if(userid){
        return db('users').where('id', userid)
    } else {
        return db('users')
    }
}
function checkUser(username){
     db('users').where('username', username)
}
