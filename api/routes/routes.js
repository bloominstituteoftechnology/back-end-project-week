const { 
  createUser, 
  login,
  newNote, 
  getNoteById,
  getNoteByUser,
  deleteNote,
  editNote
} = require('../controllers');

module.exports = server => {
  server.route('/api/users').post(createUser);  
  // server.route('/api/login').post(login)

  // routes by user
  server.route('/api/user/:id').get(getNoteByUser)

  // routes by note
  server.route('/api/note').post(newNote);
  server.route('/api/note/:id').get(getNoteById)
  server.route('/api/note/:id').delete(deleteNote)
  server.route('/api/note/:id').put(editNote)

}