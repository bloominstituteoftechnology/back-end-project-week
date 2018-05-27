const express = require('express');
const Notes = require('../models/notesModel');
const User = require('../models/userModel');

const deleteNote = async function(req, res) {
  //const { id } = req.params;

  const { username } = req.params;
  console.log('this is my body', req.body);
  const { title } = req.body;
  Notes.findOneAndRemove({ title })
    .then(data => {
      console.log('this is data', data);
      res.send(data);
    })
    .catch(error => {
      console.log('error');
    });
};

module.exports = { deleteNote };
