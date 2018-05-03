const express = require('express');
const Notes = require('../models/notesModel');
const User = require('../models/userModel');

const editNote = async function(req, res) {
  /// const { id } = req.params;

  // const { username } = req.params;

  const { id } = req.params;
  console.log('this is body', req.body);
  console.log('this is params', req.params);
  Notes.findByIdAndUpdate( id , req.body)
    .then(data => {
      console.log('this is data', data);
      res.send(data);
    })
    .catch(error => console.log('error'));
};

module.exports = { editNote };
