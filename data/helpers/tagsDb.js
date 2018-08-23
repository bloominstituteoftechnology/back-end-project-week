const db = require('../db');

module.exports = {
    remove: id => {
        return db('tags').where('id', id).del();
    },
    insert: (id, tag) => {
        return db('tags').where('id', id).insert(tag);
    }
}