const Note = require('../models/NoteModel');

const getNotes = (req, res) => {
  Note.find({})
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(422).json({ error: 'The notes could not be retrieved!' });
    });
};

module.exports = {
  getNotes
};