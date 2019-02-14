const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);



getNotes = () => {
    return db('notes');
}


insert = (note) => {
    return db('notes').insert(note);
}

findById = (id) => {
    return db('notes').where('id', id).first();
}

removeNote = (id) => {
    return db('notes').where('id', id).del();
}

updateNote = (id, note) => {
    return db('notes').where('id', id,).update(note);
}



module.exports ={
    getNotes,
    insert,
    findById,
    removeNote,
    updateNote
}