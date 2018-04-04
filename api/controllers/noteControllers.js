const mongoose = require("mongoose");
const Note = require("../models/Notes");
//const Comment = require("../models/commentModel");

const createNote= (req, res) => {
  const { user, title, description } = req.body;
  const newNote = new Note({ author, title, content });
  newNote
    .save()
    .then(newNote => {
      res.json(newNote);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating new note" });
    });
};

const getNotes = (req, res) => {
  Note.find()
    .exec()
    .then(note => {
      res.json(notes);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting notes" });
    });
};

// const getNote = (req, res) => {
//   const { id } = req.params;
//   Note.findById(id)
//     .populate("user", "userName")
//     .populate({
//       path: "comments",
//       populate: { path: "author", select: "userName" }
//     })
//     .exec()
//     .then(post => {
//       res.json(post);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Error getting post by id" });
//     });
// };

const updateNote = (req, res) => {
  const { id } = req.params;
  const { user, title, description } = req.body;
};
