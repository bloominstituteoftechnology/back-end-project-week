const db = require('../db');

module.exports = {
  get: (id) => {
    let query = db('notes');

    if (id) {
      return query.where('id', id).first();
    }

    return query;
  },

  insert: (note) => {
    return db('notes').insert(note).then(([id]) => module.exports.get(id));
  },

  update: (id, editedNote) => {
    return db('notes').where('id', id)
                      .update(editedNote)
                      .then(count => (count > 0 ? module.exports.get(id) : 0));
  },

  delete: (id) => {
    return db('notes').where('id', id).del();
  }
}
