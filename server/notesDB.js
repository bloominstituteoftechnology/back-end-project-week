const db = require('../data/db.js');

module.exports = {
    getNotes,
}

function getNotes() {
    return db('notes')
}