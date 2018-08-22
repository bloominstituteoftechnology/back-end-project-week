const db = require('../db');

module.exports = {
  get: (credentials) => {
    return db('users').where({ username: credentials.username }).first();
  },

  insert: (user) => {
    return db('users').insert(user);
  },

  getNoteOrdering: (id) => {
    return db('users').where('id', id).select('noteOrdering').first();
  },

  updateNoteOrdering: (id, updatedNoteOrdering) => {
    let result = 0;
    console.log("helper: ", updatedNoteOrdering);
    db('users').where('id', id)
               .update(updatedNoteOrdering)
               .then(count => result = (count > 0 ? module.exports.getNoteOrdering(id) : 0));
    return result;
  }
}
