const router = require("express").Router();

const Note = require("./models/noteModel");

router
  .route("/")
  .get(get)
  .post(post);

router
  .route("/:id")
  .get((req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note === null)
          res.status(404).json({
            message: "The note ID does not exist."
          });
        else res.status(200).json(note);
      })
      .catch(error => {
        res
          .status(500)
          .json(
            { message: "The note could not be retrieved." },
            err
          );
      });
  })
  .delete((req, res) => {
    Note.findByIdAndRemove(req.params.id)
      .then(note => {
        if (note === null)
          res.status(404).json({
            message: "The note ID does not exist."
          });
        else res.status(200).json(note);
      })
      .catch(error => {
        res.status(500).json({ message: "Note could not be removed" }, err);
      });
  })
  .put((req, res) => {
    if (!(req.body.title && req.body.content))
      res.status(400).json({
        errorMessage: "Please provide title and content."
      });
    else {
      Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(note => {
          if (note === null)
            res.status(404).json({
              message: "The note ID does not exist."
            });
          else res.status(200).json(note);
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "Note could not be modified."
          });
        });
    }
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
          { errorMessage: "Note could not be retrieved." },
          err
        );
    });
}

function post(req, res) {
  const noteData = req.body;

  const note = new Note(noteData);

  if (!(req.body.title && req.body.content))
    res.status(400).json({
      errorMessage: "Please provide both title and content."
    });

  note
    .save()
    .then(note => {
      res.status(201).json(note);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Server Error."
      });
    });
}

module.exports = router;