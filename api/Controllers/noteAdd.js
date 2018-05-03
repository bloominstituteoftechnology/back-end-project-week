const User = require('../Models/User');
const Note = require('../Models/Note');

const noteAdd = (req, res) => {
  const { username, id, title, content } = req.body;

  // const saveNote = () => {
  const newestNote = new Note({
    author: id,
    title: title,
    content: content,
  });

  User.findOneAndUpdate({
    username: username,
    $push: { notes: newestNote },
  })
    .then(user => {
      console.log(`===AUTHOR===:`, username);
      console.log(`===NEW NOTE===`, newestNote);
      newestNote
        .save()
        .then(savedNote => {
          console.log(`Note successfully saved!!! YAY`);
        })
        .catch(err => {
          res.status(500).json({ Error: `Unable to save new note: ${err}` });
        });
    })
    .catch(err => {
      res.json({ Error: `Unable to find user ${err}` });
    });
  // };

  // saveNote();
};

module.exports = noteAdd;
