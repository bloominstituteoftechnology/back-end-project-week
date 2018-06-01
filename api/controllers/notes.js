const User = require("../models/User.js");
const Note = require("../models/Note");

// ====== GET /api/notes =====
const getNotes = (req, res) => {
  if (req.decoded) {
    Note.find({})
      .then(notes => {
        res.status(200).json(notes);
        console.log("GET test success!");
      })
      .catch(error => {
        res.status(500).json({
          error: "Error retrieving notes."
        });
      });
  } else {
    return res.status(422).json({
      error: "Please login to view notes."
    });
  }
};

// ====== GET /api/notes/:id =====
const getNote = (req, res) => {
  if (req.decoded) {
    Note.findById(req.params.id)
      .then(note => {
        res.status(200).json(note);
      })
      .catch(error => {
        res.status(500).json({
          error: "Error retrieving specified note."
        });
      });
  }
};

// ====== POST /api/notes =====
const createNote = (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title,
    content
  });

  if (req.decoded) {
    note
      .save()
      .then(newNote => {
        res.status(201).json(newNote);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error creating a new note."
        });
      });
  }
};

const editNote = (req, res) => {
  if (req.decoded) {
  }
};

const deleteNote = (req, res) => {
  if (req.decoded) {
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote
};
