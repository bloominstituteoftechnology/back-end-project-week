const { authenticate } = require('../utils/middleswares');

const { 
  getNotes, 
  editNote, 
  createNote, 
  deleteNote
} = require('../controllers/notes');

const {
  login
} = require('../controllers/login');

const {
  createUser
} = require('../controllers/user');

module.exports = server => {
  server.get('/notes', authenticate, getNotes);
  server.post('/signup', createUser);
  server.post('/login', login);
  server.post('/new', authenticate, createNote);
  server.put('/edit/:id', authenticate, editNote);
  server.delete('/delete/:id', authenticate, deleteNote);
};