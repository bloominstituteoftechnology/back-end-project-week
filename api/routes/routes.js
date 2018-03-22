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

server.get('/notes', getNotes);
server.post('/notes', newNote);
server.get('/notes/:id', getNoteById);
server.put('/notes/:id', editNote);
server.delete('/notes/:id', deleteNote);
server.post('/users/signin', comparePW, logIn);
server.post('/users/signup', encryptPW, registration);


module.exports = server;
