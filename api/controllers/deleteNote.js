const express = requore('express');
const Notes = require('../models/notesModel');
const User = require('../models/userModel');

const deleteNote = (req, res) => {
  const { id } = req.params;

  const { userID } = req.params;
  Notes.findByIdAndRemove(noteID, req.body, { new: true })
    .then(deleteNote => {
      res.status(200).json(deleteNote);
    })
    .catch(error => {
      console.log('error');
    });
};
