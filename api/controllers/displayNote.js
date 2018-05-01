const express = require('express');
const Notes = require('../models/notesModel');
const User = require('../models/userModel');

const displayNotes = (req, res) => {
  const {userID} = req.params;
  const loggedInUser = await User.findById(userID).populate("notes");
  User.findById(userID)
    .then(note => {
      res.status(200).send({ notes: loggedInUser.notes });
    })
    .catch(error => {
      console.log('error');
    });
};

module.exports = { displayNotes };
