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
    checkUser, 
    addAccessToken
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

// function savePocketToken(userid, pocketToken){
//     return db('users').where('userid', userid).update('pocketToken', pocketToken)
// }
// incomplete and untested but the idea is that it acts as a redirect for the poceket app or other api like slack to send back a code and then the server then sends a token request which it returns and stores on the server. keeping the token off the front end.I think. 

function addAccessToken(username, token, account){
    return db('users').where('username', username).update('slack_access_token', token).update(account, true)
}

function checkUser(username){
    db('users').where('username', username)
}

function userSettings(username){
    db('users').where('username', username).select('slack', 'username', 'firstname', 'lastname', 'slack_scope', 'slack_team_name' )
}
