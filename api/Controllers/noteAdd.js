const User = require('../Models/User');
const Note = require('../Models/Note');

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
    })
    .catch(err => {
      res
        .status(500)
        .json({ Error: `Unable to save new note to the DB: ${err}` });
    });

  console.log(newestNote);

  User.findByIdAndUpdate(
    userId,
    {
      $push: { notes: noteId },
    },
    { new: true }
  )
    .then(user => {
      console.log(`===AUTHOR===:`, username, `===AUTHOR ID===`, userId);
      console.log(`===NEW NOTE===`, newestNote);
    })
    .catch(err => {
      console.log(`===ERR AUTHOR===`, username, `===ERR AUTHOR ID===`, userId);
      console.log(`===ERR NEWEST NOTE===:`, newestNote);
      res.json({
        Error: `Unable to find user, YOU HAVE TO BE KIDDING ME`,
        err,
      });
    });
};

module.exports = noteAdd;
