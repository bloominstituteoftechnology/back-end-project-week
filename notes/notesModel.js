const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add,
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