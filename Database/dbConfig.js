const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);



get = () => {
    return db('notes');
}


insert = (note) => {
    return db('notes').insert(note)
}

findByTitle = (title) => {
    return db('notes').where('title', title).first()
}



module.exports ={
    get,
    insert,
    findByTitle,
}