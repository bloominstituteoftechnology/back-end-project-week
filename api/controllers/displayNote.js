const express = require('express');
const Notes = require('../models/notesModel');
const User = require('../models/userModel');

const displayNotes = async function(req, res) {
  console.log('xxxxxxxxxxxxxxxxxxxxxx');
  console.log(req.params);
  console.log('xxxxxxxxxxxxxxxxxxxxxx');
  const { username } = req.params;
  const loggedInUser = await User.findOne({ username }).populate('notes');
  console.log('xxxxxxxxxxxxxxxxxxxxxx');
  console.log(loggedInUser);
  console.log('xxxxxxxxxxxxxxxxxxxxxx');
  res.status(200).json({ notes: loggedInUser.notes });
  // try {
  //   const { userID } = req.params.userID;
  //   const loggedInUser = await User.findById(userID).populate('notes');
  //   res.status(200).send({ notes: loggedInUser.notes });
  // } catch (error) {
  //   res.status(404).send({ error });
  // }
  // User.findById(userID)
  //   .then(note => {
  //     res.status(200).send({ notes: loggedInUser.notes });
  //   })
  //   .catch(error => {
  //     console.log('error');
  //   });
  // res.status(200).send({ notes: loggedInUser.notes });
};

module.exports = { displayNotes };
