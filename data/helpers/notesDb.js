const db = require('../db');

module.exports = {
  getNotes: () => {
    return db('notes');
  },

  getNote: id => {
    id = Number(id);
    return db('notes').where({ id }).first();
  },

  addNote: note => {
    return db('notes').insert(note).then(ids => ({id: ids[0]}));
  },

  editNote: (id, note) => {
    id = Number(id)
    return db('notes').where({ id }).update(note);
  },

  deleteNote: id => {
    id = Number(id);
    return db('note').where({ id }).del();
  }
}