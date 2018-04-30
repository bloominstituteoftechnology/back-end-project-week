const express = require("express");
const router = express.Router();

const Note = require("./notesModel.js");

router
  .route("/")
  .post((req, res) => {
    const note = new Note(req.body);
    note
      .save()
      .then(newNote => {
        res.status(201).json(newNote);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .get((req, res) => {
    Note.find().then(notes => {
      res.json(notes);
    });
  });

module.exports = router;
