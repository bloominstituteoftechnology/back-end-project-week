const User = require('../Models/User');
const Note = require('../Models/Note');

const noteAdd = (req, res) => {
  const { username, userId, title, content } = req.body;
  console.log(`USER ID: `, userId);
  // const saveNote = () => {
  const newestNote = new Note({
    author: userId,
    title: title,
    content: content,
  });

  console.log(newestNote);

  User.findOneAndUpdate({
    username: username,
    $push: { notes: newestNote },
  })
    .then(user => {
      console.log(`===AUTHOR===:`, username, `===AUTHOR ID===`, userId);
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
      console.log(`===AUTHOR===`, username, `===AUTHOR ID===`, userId);
      console.log(`===NEWEST NOTE===:`, newestNote);
      res.json({ Error: `Unable to find user`, err });
    });
  // };

  // saveNote();
};

module.exports = noteAdd;
