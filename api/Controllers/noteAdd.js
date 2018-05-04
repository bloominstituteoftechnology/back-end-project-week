const mongoose = require('mongoose');
const User = require('../Models/User');
const Note = require('../Models/Note');

const noteAdd = (req, res) => {
  const { username, userId, title, content } = req.body;
  let noteId;

  const newestNote = new Note({
    author: userId,
    title: title,
    content: content,
  });

  newestNote
    .save()
    .then(savedNote => {
      noteId = savedNote._id;
      User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: { notes: noteId },
        }
      )
        .then(user => {
          res
            .status(200)
            .json({ Message: `Note Successfully Saved to users database!` });
        })
        .catch(err => {
          res.status(500).json({
            Error: `Unable to find user`,
            err,
          });
        });
    })
    .catch(err => {
      res.status(500).json({ Error: `Unable to save new note to the DB`, err });
    });
};

module.exports = noteAdd;
