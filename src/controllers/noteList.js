const Note = require('../notes/Note.js');
const User = require('../users/User.js');

const noteList = (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .populate('notes', '-password')
    .then(notes => {
      console.log(username);
      res.json(notes);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = { noteList };
