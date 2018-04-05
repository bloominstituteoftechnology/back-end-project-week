const mongoose = require('mongoose');
const noteSchema = require('../models/noteSchema');

const editNote = (req, res) => {
  const note = req.body;
  noteSchema.findByIdAndUpdate({ id: note.id }, note, { new: true })
    .then(changedNote => {
      res.status(200).json(changedNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error updating your note', error: err });
    });
}

module.exports = { editNote, };