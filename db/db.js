const knex = require('knex');

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

module.exports = {
    getNotes 
}

function getNotes(id){
    if(id){
        return db('notes').where('id', id)
    } else {
        return db('notes')
    }
}