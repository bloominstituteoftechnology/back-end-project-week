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
    return db('notes').where('userid', userid)
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

function editNote(editId, newNote){
    return db('notes').where('id', editId).update(newNote)
}

function addUser(newUser){
    if(newUser){
        db('users').insert(newUser).then(res => {
            return db('users').where('username', newUser.username)
        })
    } 
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
