const { getNotes } = require('./controllers/getNotes')
const { postNote } = require('./controllers/postNote');
const { editNote } = require('./controllers/editNote');
const { deleteNote } = require('./controllers/deleteNote');
const { addUser } = require('./controllers/addUser');
const { userLogin } = require('./controllers/userLogin');



module.exports = server => {
  server
    .route('/api/notes/:id')
    .get(getNotes)
    .delete(deleteNote);
  server
    .route('/api/notes')
    .post(postNote)
    .put(editNote);

  server.route('/api/users').post(addUser);
  server.route('/api/login').post(userLogin);
}