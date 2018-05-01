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
const editNote = (req, res) => {
  const { title, text, _id } = req.body;
  if (title && text && _id) {
    Note.findOneAndUpdate({ _id }, { title, text })
      .then(note => res.send(note))
      .catch(err => {
        res.status(422).send('Error editing the note');
      });
  } else {
    res
      .status(422)
      .send('Please send valid title, text and/or id for the note');
  }
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  if (id) {
    Note.findOneAndRemove({ _id: id })
      .then(note => res.send(note))
      .catch(err => {
        res.status(422).send('Error deleting the note');
      });
  } else {
    res.status(422).send('Please send id for the note');
  }
};

module.exports = {
  getNotes,
  createNote,
  editNote,
  deleteNote
};
