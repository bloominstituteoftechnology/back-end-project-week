const mongoose = require('mongoose');
const User = require('../Models/User');
const Note = require('../Models/Note');

const ObjectId = mongoose.Schema.Types.ObjectId;

const noteAdd = (req, res) => {
  const { username, userId, title, content } = req.body;
  let noteId;
  console.log(`USER ID: `, userId);

  const newestNote = new Note({
    author: userId,
    title: title,
    content: content,
  });

  newestNote
    .save()
    .then(savedNote => {
      console.log(
        `Note successfully saved to the DB only, not to a user just yet`
      );
      noteId = savedNote._id;
      User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: { notes: noteId },
        }
      )
        .then(user => {
          console.log(`++++ NOTE SUCCESSFULLY SAVED TO USER DB ++++`);
        })
        .catch(err => {
          res.json({
            Error: `Unable to find user, YOU HAVE TO BE KIDDING ME`,
            err,
          });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ Error: `Unable to save new note to the DB: ${err}` });
    });
};

module.exports = noteAdd;
