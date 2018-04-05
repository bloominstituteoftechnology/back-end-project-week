const {createUser, loginUser} = require('../controllers/userControllers');
const {createNote, getNotes, updateNote, deleteNote} = require('../controllers/noteControllers');

module.exports = app => {
  app.post('/new-user',createUser);
  app.post('/login', loginUser);
  app.post('/newNote', createNote);
  app.put('/update', updateNote); 
  app.get('/notes', getNotes);
  app.delete('/id', deleteNote);
};
