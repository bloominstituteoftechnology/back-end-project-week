const Note = require('../models/NoteModel');
const User = require('../models/UserModel');

// const getNotes = (req, res) => {
//   Note.find({})
//     .populate('notes')
//     .then(notes => {
//       console.log(notes);
//       res.status(200).json(notes);
//     })
//     .catch(err => {
//       res.status(422).json({ error: 'The notes could not be retrieved!' });
//     });
// };

const getNotes = (req, res) => {
  const { username } = req.params;
    User.findOne({ username: username })
      .populate('notes')
      .then(popData => {
        res.status(200).json(popData.notes);
      })
      .catch(err => {
        res.status(422).json({ error: 'The notes could not be retrieved!' });
      });
  };

module.exports = {
  getNotes
};