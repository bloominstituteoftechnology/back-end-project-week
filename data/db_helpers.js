const knex = require('knex');
const db_config = require('../knexfile');
const db = knex(db_config.development);


module.exports = {

    getNotes: () => {
        return db('notes').leftJoin('tags', 'notes_id', 'notes.id')
    },

    getTags: () => {
        return db('tags')
    },

    getNotesTags: () => {
        return db('notes_tags')
    },

    getNotesById: (id) => {
        return db('notes').where('id', id)
        .first();
    },

    //see Kyle's notes 
}
