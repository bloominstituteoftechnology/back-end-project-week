const db = require('../db');

module.exports = {
// POST | Create a note with a title and content.
  create: note => {
    return db('notes')
      .insert(note)
      .then(ids => ({ id: ids[0] }));
  },
// GET | Display a list of notes.
  readAll: () => {
    return db('notes')
    .select();
  },
// GET | View an existing note.
  read: id => {
    return db('notes')
      .where({ id: Number(id) });
  },
// UPDATE | Edit an existing note.
  update: (id, note) => {
    return db('notes')
      .where('id', Number(id))
      .update(note);
  },
// DELETE | Delete an existing note.
  remove: id => {
    return db('notes')
      .where('id', Number(id))
      .del();
  }
}