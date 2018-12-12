const db = require('../data/db.js');

module.exports = {
    register,
    login
}

function register(user) {
    return db('users')
    .insert(user)
    .returning('id');
}

function login(user) {
    return db('users')
    .where('username', '=', user.username)
    .first();
}