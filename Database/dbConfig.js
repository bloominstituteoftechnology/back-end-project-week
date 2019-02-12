const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);



getNotes = () => {
    return db('notes');
}


insert = (note) => {
    return db('notes').insert(note)
}

findByTitle = (title) => {
    return db('notes').where('title', title).first()
}



module.exports ={
    getNotes,
    insert,
    findByTitle,
}