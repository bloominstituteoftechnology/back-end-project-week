const Note = require('../models/NoteModel');

const singleNote = (req, res) => {
  const { id } = req.params;
  Note.findById(id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(404).json({ error: 'The note with the specified ID does not exist!' });
    });
};

module.exports = {
  singleNote
};
