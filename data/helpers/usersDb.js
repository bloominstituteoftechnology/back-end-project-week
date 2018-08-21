const db = require('../db');

module.exports = {
    get: () => {
        return db('users');
    },
    login: credentials => {
        return db('users').whereRaw('LOWER("username") = ?', credentials.username.toLowerCase()).first();
    },
    register: credentials => {
        return db('users').insert(credentials).then(ids => ({ id: ids[0] }));;
    }
}