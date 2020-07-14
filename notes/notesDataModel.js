const db = require('./configs/notesDbConfig.js')
const table = 'notes'

module.exports = {
    findAll,
    findById,
    addNotes,
    editNote,
    deleteNote
}

function findAll(){
    return db(table)
}

function findById(_id){
    return db(table).where({_id})
}

function addNotes(newNote){
    return db(table).insert(newNote)
}

function editNote(_id, newNote){
    return db(table).where({_id}).update(newNote)
}

function deleteNote(_id){
    return db(table).where({_id}).del()
}