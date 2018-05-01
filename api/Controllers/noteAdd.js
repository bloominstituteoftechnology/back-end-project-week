const User = require('../Models/User');
const Note = require('../Models/Note');

const noteAdd = (req, res) => {
  const { title, content } = req.body;
  const username = req.username;
  let id;

  User.findOne({ username })
    .then(user => {
      id = user._id;
    })
    .catch(err => {
      res.json({ Error: `Unable to find user ${err}` });
    });

  if (author) {
    const newNote = new Note({ id, title, content });
    newNote
      .save()
      .then(savedNote => {
        res.status(200).json({ Message: 'Note successfully saved!' });
      })
      .catch(err => {
        res.status(500).json({ Error: `Unable to save new note: ${err}` });
      });
  } else {
    res.status(422).json({ Error: `User error: ${err}` });
  }
};

module.exports = noteAdd;
