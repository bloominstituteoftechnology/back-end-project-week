

const Notes = require('../models/notesModel');
const User = require('../models/userModel');
const express = require('express');

const createNote = async function(req, res) {
  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');
  //   console.log(req.body);
  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');
  const note = req.body; //Getting from model

  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');
  //   console.log(req.params);
  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');

  const newNote = new Notes(note);

  console.log('printing new note', newNote);
  const { username } = req.params;

  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');
  //   console.log(username);
  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');

  if (!req.body.content) {
    console.log('the content was empty');
    return res.status(400).send({ message: 'Content cannot be empty' });
  }

  //   const loggedInUser = await User.findOne({ username });

  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');
  //   console.log('logged in: ', loggedInUser);
  //   console.log('xxxxxxxxxxxxxxxxxxxxxx');

  if (req.params.username) {
    // console.log('in the if statement');
    User.findOneAndUpdate({ username }, { $push: { notes: newNote } }, (error, note) => {
      if (error) {
        console.log('in the error statement');
        res.status(500).json({ error: 'error' });
      }
    });
    // console.log('in the return statement');

    // return;
  }

  //Save Note in the database
  newNote
    .save()
    .then(data => {
      console.log('this is data: ', data);
      res.send(data);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error adding note'
      });
    });
};

module.exports = { createNote };
