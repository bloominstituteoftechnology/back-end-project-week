const mongoose = require('mongoose');
const noteSchema = require('../models/noteSchema');

const deleteNote = (req, res) => {
  const { id } = req.body;
  noteSchema.findByIdAndRemove(id)
    .then(removedNote => {
      res.status(200).json(removedNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error deleting your note', error: err });
    });
}

module.exports = { deleteNote, };