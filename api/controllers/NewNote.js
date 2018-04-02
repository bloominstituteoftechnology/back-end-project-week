const Note = require('../models/NoteModel');

const newNote = (req, res) => {
  const { title, body } = req.body;
  const note = new Note({ title, body });
  note
    .save()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error saving note!' });
    });
};

module.exports = {
  newNote
};