const express = require('express');
const Notes = require('../models/notesModel');
const User = require('../models/userModel');

const editNote = (req, res) => {
  const { id } = req.params;

  const { userID } = req.params;

  const { title, body } = req.body;

  Notes.findByIdAndUpdate(id, req.body, { new: true })
    .then(updateNote => {
      res.status(200).json(updateNote);
    })
    .catch(error => console.log('error'));
};

module.export = { editNote };
