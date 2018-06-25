// const { login } = require('./login');
const { createUser } = require('./user');

const { newNote, getNoteById, deleteNote, editNote } = require('./note')
const { getNoteByUser } = require('./userNotes')

module.exports = {
  // login,
  createUser,
  newNote,
  getNoteById,
  deleteNote,
  getNoteByUser, 
  editNote,
}