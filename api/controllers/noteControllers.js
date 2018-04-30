const mongoose = require("mongoose");
const models = require("./models");
// const Note = require("../models/Users");
// const User = require("../models/Users");
//const Comment = require("../models/commentModel");

const createNote= (req, res) => {
  

  const { title, description } = req.body;
  const newNote = new models.Note({ title, description });
  const username = req.session.username;
  newNote
    .save()
    .then(newNote => {
       models.User.findOneAndUpdate({ username}, { $push: { notes: newNote } })
      .then((user) => {
         res.status(201).send(user);
      })
     .catch(err => res.send(err));
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating new note" });
    });
};

const getNotes = (req, res) => {
  const username = req.session.username;
  console.log(username);
  models.User.findOne({'username': username})
    .exec()
    .then(user => {
      console.log(user, user.notes);
      res.json({
        notes: user.notes
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting notes" });
    });
};

// const getNote = (req, res) => {
//   const { id } = req.params;const { id } = req.params;
//   models.Note.findById(id)
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
  const username = req.session.username;
  const noteId = req.query.id;
  const { title, description } = req.body;
  
    models.User.findOne({'username': username})
    .exec()
    .then(user => {
      const note = user.notes[noteId];
      note.title = title;
      note.description = description;
      user.save()
      // models.Note.findByIdAndUpdate(note.id, {title: title, description: description}, {new: true})
      .then(user1 => {
        console.log("updated note:",user1);
        res.json(user1);
      }
      ).catch(err =>res.send(err));
    })
    .catch(err => res.send(err));
};

const deleteNote  = (req, res) => {
  const noteId = req.query.id;
  const username = req.session.username;
  models.User.findOne({'username': username})
    .exec()
    .then(user => {
      const note = user.notes[noteId];
      user.notes.remove(note._id);
      user.save()
      // models.Note.findByIdAndUpdate(note.id, {title: title, description: description}, {new: true})
      .then(user1 => {
        console.log("updated note:",user1);
        res.json(user1);
      }
      ).catch(err =>res.send(err));
    })
    .catch(err => res.send(err));
};

module.exports = {
  createNote,
  getNotes,
  //getNote,
  updateNote,
  deleteNote
};