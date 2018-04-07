const mongoose = require('mongoose');
const Note = require('../models/noteModel');

const deleteNote = (req, res) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then(deletedNote => {
      res.send(deletedNote);
    })
    .catch(err => res.send(err));
};

module.exports = {
  deleteNote,
};