const db = require('./index.js');

function getNotes() {
  return db('notes');
}

function getNote(id) {
  return db('notes').where({ id: id });
}

function addNote(note) {
  return db('notes').insert(note);
}

function deleteNote(id) {
    return db('notes')
      .where({ id: id })
      .del();
}

function updateNote(id, note) {
  return db('notes')
    .where({ id: id })
    .update(note);
}



module.exports = {
  getNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote
};