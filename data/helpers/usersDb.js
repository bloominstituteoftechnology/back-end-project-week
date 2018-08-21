const db = require('../db');

module.exports = {
    login: credentials => {
        return db('users').whereRaw('LOWER("username") = ?', credentials.username.toLowerCase()).first();
    }
}