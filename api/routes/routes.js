const { authenticate } = require('../utils/middleswares');

const { 
  getNotes, 
  editNote, 
  createNote, 
  deleteNote, 
  createUser, 
  login 
} = require('../controllers');

module.exports = server => {
  server.get('/api/notes', authenticate, getNotes);
  server.post('api/users', createUser);
  server.post('/api/login', login);
  server.post('api/new', authenticate, createNote);
  server.put('/api/edit', authenticate, editNote);
  server.delete('/api/delete', authenticate, deleteNote);
};