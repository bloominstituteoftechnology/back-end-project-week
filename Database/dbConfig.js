const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);


insert = (note) => {
    return db('notes').insert(note)
}

findByTitle = (title) => {
    return db('notes').where('title', title).first()
}



module.exports ={
    insert,
    findByTitle,
}