const mongoose = require("mongoose");
const Note = require("../models/Notes");
//const Comment = require("../models/commentModel");

const createNote= (req, res) => {
  const { user, title, description } = req.body;
  const newNote = new Note({ user, title, description });
 
  newNote
    .save()
    .then(newNote => {
      const id = newNote._id;
      User.findOneAndUpdate({_id: userId }, { $push: { notes: id } })
      .then(() => {
        res.status(201).send(newNote);
      })
     .catch(err => res.send(err));
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating new note" });
    });
};

const getNotes = (req, res) => {
  const { id } = req.params;
  Note.find()
    .exec()
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting notes" });
    });
};

const getNote = (req, res) => {
  const { id } = req.params;
  Note.findById(id)
    .populate("user", "userName")
    .populate({
      path: "comments",
      populate: { path: "author", select: "userName" }
    })
    .exec()
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting post by id" });
    });
};

const updateNote = (req, res) => {
  const { tobeupdate, id } = req.body;
  Note.findByIdAndUpdate(id, tobeupdate)
  .then(freshNote => {
    res.send(freshNote);
  })
  .catch(err => res.send(err));
};

const deleteNote  = (req, res) => {
  const {id } = req.params;
  Note.findByIdAndRemove(id)
  .then(deletedNote => {
    res.send(deletedNote);
  })
  .catch(err => {
    res.err(err);
  });
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
};