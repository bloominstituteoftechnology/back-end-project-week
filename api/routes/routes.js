const {
  getNotes,
  newNote,
  getNoteById,
  editNote,
  deleteNote
} = require('../controllers/noteController');

const {
  registration,
  logIn
} = require('../controllers/userController');

const {
  authenticate,
  encryptPW,
  comparePW
} = require('../middleware/auth');

const server = require('express').Router();

// server.use('/notes/*', authenticate);

server.get('/notes', authenticate, getNotes);
server.post('/notes', authenticate, newNote);
server.get('/notes/:id', authenticate, getNoteById);
server.put('/notes/:id', authenticate, editNote);
server.delete('/notes/:id', authenticate, deleteNote);
server.post('/users/signin', comparePW, logIn);
server.post('/users/signup', encryptPW, registration);


module.exports = server;
