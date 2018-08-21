const db = require('../db');

module.exports = {
    get: (id) => {
        let query = db('notes');
        if (id) {
          return query.where('id', id).first();
        }
        return query;
      },
    insert: note => {
        return db('notes').insert(note).then(ids => ({ id: ids[0] }));
    },
    update: (id, note) => {
        return db('notes').where('id', id).update(note);
    },
    remove: id => {
        return db('notes').where('id', id).del();
    }
}