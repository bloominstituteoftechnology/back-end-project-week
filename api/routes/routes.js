const {createUser, loginUser, hashPw, logOut, whoAmI} = require('../controllers/userControllers');
const {createNote, getNotes, updateNote, deleteNote, getNote} = require('../controllers/noteControllers');

module.exports = app => {
  app.post('/new-user',hashPw, createUser);
  app.post('/login', loginUser);
  app.post('/logout', logOut);
  app.get('/whoami', whoAmI);
  app.post('/newNote', createNote);
  app.put('/update', updateNote); 
  app.get('/notes', getNotes);
  app.get('/', getNote);

  app.delete('/id', deleteNote);
};
