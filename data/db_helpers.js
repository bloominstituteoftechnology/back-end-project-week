const knex = require('knex');
const db_config = require('../knexfile');
const db = knex(db_config.development);


module.exports = {

    getNotes: () => {
        return db('notes')
    },

    //see Kyle's notes 
}
