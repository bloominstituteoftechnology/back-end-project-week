const express = require("express");
const router = express.Router();

const Note = require('./UsersModel');
const User = require('../notes/NotesModel');

router
  .route('/')
  .get((req, res) => {
    res.send("These are not the users you are looking for.")
  })
  .post((req, res) => {
    res.json({ message: "Can't touch this.", body: req.body })
  })


module.exports = router;