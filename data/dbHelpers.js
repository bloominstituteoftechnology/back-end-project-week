const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);


module.exports = {
    find: () => {
        return db('notes');
    },

    findById: (id) => {
        return db('notes').where({ id: Number(id) });
    },

    insert: (note) => {
        return db('notes')
            .insert(note)
            .then(ids => ({
                id: ids[0]
            }))
    },

    update: (id, note) => {
        return db('notes')
            .where('id', Number(id))
            .update(note);
    },

    remove: (id) => {
        return db('notes')
            .where('id', Number(id))
            .truncate();
    }
}