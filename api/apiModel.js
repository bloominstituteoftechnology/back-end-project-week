const environment = process.env.ENVIRONMENT || 'development';
const knexConfig = require('../knexfile')[environment];
const db = require('knex')(knexConfig);

module.exports = {
    find,
    findById,
    create,
    edit,
    remove,
};

function find() {
    return db('notes');
}

function findById(id) {
    return db('notes')
        .where({ id })
        .first();
}

function create(note) {
    return db('notes')
        .insert(note)
        .into('notes');
}

function edit(id, changes) {
    return db('notes')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('notes')
        .where({ id })
        .del();
}