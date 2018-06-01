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
  const { id } = req.params;

  if (req.decoded) {
    Note.findById(id)
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

// ====== PUT /api/notes/:id =====
const editNote = (req, res) => {
  const { id } = req.params;
  const update = req.body;

  if (req.decoded) {
    Note.findByIdAndUpdate(id, update)
      .then(note => {
        res.status(200).json({
          note,
          message: "Note successfully updated!"
        });
      })
      .catch(error => {
        res.status(500).json({
          error: "Error updating the specified note."
        });
      });
  }
};

// ====== DELETE /api/notes/:id =====
const deleteNote = (req, res) => {
  const { id } = req.params;

  if (req.decoded) {
    Note.findByIdAndRemove(id)
      .then(note => {
        res.status(200).json({
          note,
          message: "Note successfully deleted!"
        });
      })
      .catch(error => {
        res.status(500).json({
          error: "Error deleting the specified note."
        });
      });
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  editNote,
  deleteNote
};
