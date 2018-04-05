const { getNotes } = require('./controllers/getNotes')
const { postNote } = require('./controllers/postNote');
const { editNote } = require('./controllers/editNote');
const { deleteNote } = require('./controllers/editNote');





module.exports = server => {
  server
    .route('/api/notes/:id')
    .get(getNotes)
    .deleteNote(deleteNote);
  server
    .route('/api/notes')
    .post(postNote)
    .put(editNote);

}