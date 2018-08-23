const db = require('../dbConfig');

module.exports = {
    getPassword,
    add,
    remove
};

function getPassword(username) {
    const query = db('users')
    .select('password')
    .where('username', username)
    .first();
    return query.then(res => {
        return res;
    });
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

