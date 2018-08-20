const db = require('../db');

module.exports = {
    get: id => {
        let query = db('notes');
        return id ? query.where('id', id).first() : query;
    },
    insert: note => {
        return db('notes').insert(note).then(ids => ({ id: ids[0] }));
    },
    update: (id, note) => {
        return db('notes').where('id', id).update(note);
    }
}