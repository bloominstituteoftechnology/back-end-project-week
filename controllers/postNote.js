const noteSchema = require('../models/noteSchema');
const userSchema = require('../models/userSchema');

const postNote = (req, res) => {
  const noteData = req.body;
  const note = new Note(noteData);

  note
    .save()
    .then(newNote => {
      res.status(200).json(newNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error adding your note', error: err });
    });
}

module.exports = { postNote, };
