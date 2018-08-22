const db = require('../db');

module.exports = {
  getNoteOrdering: (id) => {
    return db('users').where('id', id).select('noteOrdering').first();
  },

  updateNoteOrdering: (id, updatedNoteOrdering) => {
    return db('users').where('id', id)
                      .update(updatedNoteOrdering)
                      .then(count => (count > 0 ? module.exports.getNoteOrdering(id) : 0));

  }
}
