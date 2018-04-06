const { createUser, userLogin } = require('./Controllers/userController');
const { getAllNotes, createNote } = require('./Controllers/noteController');
const middleware = require('./middlewares');

module.exports = server => {
  server.route('/new-user').post(createUser);
  server.route('/login').post(userLogin);
  server.route('/', middleware.authenticateUser).get(getAllNotes);
  server.route('/', middleware.authenticateUser).post(createNote);
};
