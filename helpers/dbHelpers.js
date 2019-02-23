const db      = require('../data/dbConfig.js');

module.exports = {
  getNotes: () => {
      return db('notes');
  },

  getNotesById: (id) =>{
    return db('notes')
          .where('id', id)
          .first();
  },

  createNote: (note) =>{
    return db('notes')
          .insert(note);
  },

  updateNote:(id, note) =>{
    return db('notes')
          .where('id', id)
          .update(note);
  },

  removeNote:(id) =>{
    return db('notes')
          .where('id',id)
          .del(id);
  }
}