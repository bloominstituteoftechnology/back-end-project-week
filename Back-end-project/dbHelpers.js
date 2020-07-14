const knex = require('knex');
const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

module.exports = {
    get: () => {
        return db('Notes')
    },

    add: (newNote) => {
        return db('Notes').insert(newNote)
    },

    view: (specificNote) => {
        return db('Notes').where('note-title', specificNote)
    },

    edit: (specificNote) => {
        return db('Notes')
    }
}
