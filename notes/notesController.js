const express = require("express");
const router = express.Router();

const Note = require("./notesModel.js");

router
  .route("/:user")
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
    
      Note.find( {user: req.params.user} ).then(notes => {
        res.json(notes);
      
  });

router
  .route("/:id")
  .put((req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
      updatedNote => {
        res.json(updatedNote);
      }
    );
  })
  .delete((req, res) => {
    console.log("Delete Request: ", req);
    Note.findByIdAndRemove(req.params.id).then(deletedNote => {
      res.json(deletedNote);
    });
  });

module.exports = router;
