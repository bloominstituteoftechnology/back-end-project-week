const Note = require('../models/noteModel');

const getNotes = (req, res) => {
  const { users } = req.body;
  Note.find({ users })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: 'Error fetching notes' }));
};

const createNote = (req, res) => {
  const { title, text, users } = req.body;
  if (title && text && users) {
    const newNote = new Note({ title, text, users });
    newNote
      .save()
      .then(note => res.json(note))
      .catch(err => {
        res.status(422).send('Error saving the note');
      });
  } else {
    res
      .status(422)
      .send('Please send valid title and description for the note');
  }
};

module.exports = {
  getNotes,
  createNote
};
