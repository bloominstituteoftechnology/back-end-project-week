const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add,
    update,
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

function add(note) {
    return db('notes')
        .insert(note)
        .into('notes');
}

function update(id, changes) {
    return db('notes')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('notes')
    .where({ id })
    .del();
}