const Note = require('../models/noteModel');

const modifyNote = (req, res) => {
  const { author, id, title, content } = req.body;
  Note.findByIdAndUpdate(id, { title, content }, { new: true } )
    .then(note => {
      if (note === null) {
        res.status(422).json({ message: 'Note by that Id was not found.'});
        return;
      }
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(422).json({ message: 'Could not modify note', err });
    });
};

module.exports = modifyNote;
