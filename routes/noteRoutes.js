const notes = require('../controllers/noteController');

module.exports = noteRoutes => {
  noteRoutes.get('/notes', (req, res) => {
    notes.getNotes;
  });
  noteRoutes.post('/notes', (req, res) => {
    notes.newNote;
  });
  noteRoutes.get('/notes/:id', (req, res) => {
    notes.getNoteById;
  });
  noteRoutes.put('/notes/:id', (req, res) => {
    notes.editNote;
  });
  noteRoutes.delete('/notes/:id', (req, res) => {
    notes.deleteNote;
  });
};
