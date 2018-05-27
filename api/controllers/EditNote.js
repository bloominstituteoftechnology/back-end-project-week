const Note = require('../models/NoteModel');

const editNote = (req, res) => {
  const { id } = req.params;
  const noteInfo = req.body;
  if (!noteInfo.title || !noteInfo.body) {
    res.status(400).json({ message: 'Please provide a Title and a Body!' });
  } else {
    Note.findByIdAndUpdate(id, noteInfo, { new: true })
      .then(note => {
        if (!note) {
          res.status(404).json({ message: 'The note with the specified ID does not exist!' });
        } else {
          res.status(200).json({ note });
        };
      })
      .catch(err => {
        res.status(500).json({ error: 'The note cannot be modified!' });
      });
  };
};

module.exports = {
  editNote
};