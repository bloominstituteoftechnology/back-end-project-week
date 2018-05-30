const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Note = require("./noteModel");
const config = require("../config");

router.route("/").get(get);
// .post(post);

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
        res
          .status(500)
          .json(
            { message: "The note information could not be retrieved." },
            err
          );
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
        res.status(500).json({ message: "The note could not be removed" }, err);
      });
  })
  .put((req, res) => {
    if (!(req.body.title && req.body.content))
      res.status(400).json({
        errorMessage: "Please provide title and content for the note."
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
        .catch(err => {
          res.status(500).json({
            errorMessage: "The note information could not be modified."
          });
        });
    }
  })
  .post((req, res) => {
    const userid = req.decoded.id;
    const noteData = { ...req.body, userid };
    console.log(noteData);
    const note = new Note(noteData);

    if (!(req.body.title && req.body.content))
      res.status(400).json({
        errorMessage: "Please provide title and content for the note."
      });

    note
      .save()
      .then(note => {
        res.status(201).json(note);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the note to the database."
        });
      });
  });

function get(req, res) {
  Note.find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json(
          { errorMessage: "The notes information could not be retrieved." },
          err
        );
    });
}

function post(req, res) {
  const noteData = req.body;

  const note = new Note(noteData);

  if (!(req.body.title && req.body.content))
    res.status(400).json({
      errorMessage: "Please provide title and content for the note."
    });

  note
    .save()
    .then(note => {
      res.status(201).json(note);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the note to the database."
      });
    });
}

module.exports = router;
