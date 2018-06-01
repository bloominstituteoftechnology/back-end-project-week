const User = require("../models/User.js");
const Note = require("../models/Note");

const getNotes = (req, res) => {
  if (req.decoded) {
    Note.find({})
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(error => {
        res.status(500).json({
          error: "Error retrieving notes."
        });
      });
  }
};

const createNote = (req, res) => {
  if (req.decoded) {
  }
};

const getNote = (req, res) => {
  if (req.decoded) {
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
