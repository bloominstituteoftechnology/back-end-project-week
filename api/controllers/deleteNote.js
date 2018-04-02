const Notes = require('../models/noteModel');

const deleteNote = (req, res) => {
  const { id, title, content } = req.body;
  Note.findByIdAndRemove(id)
    .then(note => {
      if (note === null) {
        res.status(422).json({ message: 'Note by that Id was not found.'});
        return;
      }
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(422).json({ message: 'Could not delete note', err });
    });
};

module.exports = deleteNote;
