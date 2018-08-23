const db = require('../db');

module.exports = {
    get: id => {
        if (id) return db('users').where('id', id).first();
        return db('users');
    },
    login: credentials => {
        return db('users').whereRaw('LOWER("username") = ?', credentials.username.toLowerCase()).first();
    },
    register: credentials => {
        return db('users').insert(credentials).then(ids => ({ id: ids[0] }));;
    },
    update: (id, user) => {
        return db('users').where('id', id).update(user);
    }
}