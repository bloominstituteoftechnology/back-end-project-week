const db = require('../dbConfig/db');

module.exports = {
  getAllNotesByUserId,
  getNoteByNoteId,
  createNote,
  deleteNoteByNoteId,
  updateNoteByNoteId,
};
function getAllNotesByUserId(id) {
  return db('notes').where({ user_id: id });
}
function getNoteByNoteId(noteId) {
  return db('notes').where({ id: noteId });
}
function createNote(newNote) {
  return db('notes').insert(newNote);
}
function deleteNoteByNoteId(noteId) {
  return db('notes').where({ id: noteId }).del();
}
function updateNoteByNoteId(noteId, updatedNote) {
  return db('notes').where({ id: noteId }).update(updatedNote);
}
