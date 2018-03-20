module.exports = (app) => {
  const noteController = require('../controllers/note.controller');

  app.route('/notes')
    .get(noteController.getNotes);

  app.route('/new-note')
    .post(noteController.addNote);

  app.route('/notes/:id')
    .get(noteController.viewNote);

  app.route('/edit-note')
    .put(noteController.editNote);

  app.route('/notes/:id')
    .delete(noteController.deleteNote);
}