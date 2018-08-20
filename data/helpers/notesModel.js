const db = require('../dbConfig.js');
const notesDb = db('notes');

module.exports = {
  create: note => {
    return notesDb
      .insert(note)
      .then(ids => ({ id: ids[0] }));
  },
  readAll: () => {
    return notesDb;
  },
  read: id => {
    return notesDb
      .where({ id: Number(id) });
  },
  update: (id, note) => {
    return notesDb
      .where('id', Number(id))
      .update(note);
  }
};