const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    get,
    add,
    update,
    remove
};

function get(id) {
    const query = db('Notes');
    if (id) {
        query.where('id', id);
    }

    return query;
}
function add(note) {
    return db('Notes')
    .insert(note)
    // .then(ids => ({id: ids[0]}))
}
function update(id, note) {
    return db('Notes')
    .where('id', id)
    .update(note)
}
function remove(id) {
    return db('Notes')
    .where('id', id)
    .del();
}



