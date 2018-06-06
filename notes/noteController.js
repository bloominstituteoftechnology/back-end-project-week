const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Note = require("./noteModel");
const User = require("../users/userModel");
const config = require("../config");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const notes = await Note.find({ userid: req.decoded.id });
      const name = await User.findById(req.decoded.id).select("username");
      res.status(200).json({ notes, name });
    } catch (error) {
      res.status(500).json({
        errorMessage: "There was an error retrieving your notes.",
        error
      });
    }
  })
  //  working test code to populate the username instead of sending as a separate field
  // .get((req, res) => {
  //   Note.find({ userid: req.decoded.id })
  //     .populate("userid", "username")
  //     .then(notes => {
  //       res.status(200).json(notes);
  //     })
  //     .catch(error => {
  //       res.status(500).json({
  //         errorMessage: "The notes information could not be retrieved.",
  //         error
  //       });
  //     });
  // })
  .post((req, res) => {
    const userid = req.decoded.id;
    const noteData = { ...req.body, userid };
    const note = new Note(noteData);

    if (!(req.body.title && req.body.text))
      res.status(400).json({
        errorMessage: "Please provide title and text for the note."
      });

    note
      .save()
      .then(note => {
        res.status(201).json(note);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the note to the database."
        });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note === null)
          res.status(404).json({
            message: "The note with the specified ID does not exist."
          });
        else res.status(200).json(note);
      })
      .catch(error => {
        res.status(500).json({
          message: "The note information could not be retrieved.",
          error
        });
      });
  })
  .delete((req, res) => {
    Note.findByIdAndRemove(req.params.id)
      .then(note => {
        if (note === null)
          res.status(404).json({
            message: "The note with the specified ID does not exist."
          });
        else res.status(200).json(note);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "The note could not be removed", error });
      });
  })
  .put((req, res) => {
    if (!(req.body.title && req.body.text))
      res.status(400).json({
        errorMessage: "Please provide title and text for the note."
      });
    else {
      Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(note => {
          if (note === null)
            res.status(404).json({
              message: "The note with the specified ID does not exist."
            });
          else res.status(200).json(note);
        })
        .catch(error => {
          res.status(500).json({
            errorMessage: "The note information could not be modified."
          });
        });
    }
  });

module.exports = router;
