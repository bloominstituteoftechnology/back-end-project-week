const Passport = require('passport')
const { 
  createUser, 
  login,
  newNote, 
  getNoteById,
  getNoteByUser,
  deleteNote,
  editNote
} = require('../controllers');

const {localStrategy} = require('../middleware/Auth-Middleware');

Passport.use(localStrategy);

const passportOptions = { session: false };
const authenticate = Passport.authenticate('local', passportOptions);

module.exports = server => {
  server.route('/api/users').post(createUser);  
  server.route('/api/login').post(authenticate, login)

  // routes by user
  server.route('/api/user/:id').get(getNoteByUser)

  // routes by note
  server.route('/api/note').post(newNote);
  server.route('/api/note/:id')
    .get(getNoteById)
    .delete(deleteNote)
    .put(editNote);

}