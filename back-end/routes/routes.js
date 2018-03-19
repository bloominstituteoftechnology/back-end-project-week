const {  comparePassword, authenticate, encryptPassword }  = require('../controllers/AuthControllers');
const { login }  = require('../controllers/login');
const { signup } = require('../controllers/signup');
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notes');

module.exports = server => {
  server.post('/login', comparePassword, login);
  server.post('/signup', encryptPassword, signup);
  server.post('/notes', authenticate, addNote);
  server.get('/notes', authenticate, getNotes);
  server.put('/notes', authenticate, updateNote);
  server.delete('/notes', authenticate, deleteNote);
}