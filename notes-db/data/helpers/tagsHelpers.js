const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    insert,
    remove,
};

function find() {
    return db('tags');
}

function findById(id) {
    return db('tags').where({ id: Number(id) });
}

function insert(tag) {
    return db('tags')
        .insert(tag)
        .then(ids => ({ id: ids[0] }));
}

function remove(id) {
    return db('tags')
        .where('id', Number(id))
        .del();
}
