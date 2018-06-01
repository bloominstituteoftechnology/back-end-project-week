const User = require("../models/User.js");
const Note = require("../models/Note");

const getNotes = (req, res) => {
  if (req.decoded) {
    Note.find({})
      .then(notes => {
        res.status(200).json(notes);
        console.log('GET test success!')
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

module.exports = {
  getNotes
};
