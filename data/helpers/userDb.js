const db = require('../dbConfig');

module.exports = {
    get,
    add,
    remove
};

function get(id) {
    const query = db('users');
    if (id) {
        query.where('id', id);
    }
    return query;
}

function add(user) {
    return db('users')
        .insert(user)
}

function remove(id) {
    return db('users')
        .where('id', id)
        .del()
}