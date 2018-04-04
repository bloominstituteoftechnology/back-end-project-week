const Note = require('../models/noteModel');
const User = require('../models/userModel');

const sendUserError = (err, res) => {
  res.status(422);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

const createNote = (req, res) => {
  const { title, text } = req.body;
  const user = req.decoded.id;
  const myNote = new Note({ title, text, user });
  myNote
    .save()
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.status(422).json({ error: 'Error saving data to the DB', err });
    });
};

const getAllNotes = (req, res) => {
  console.log('Will you make it here?');
  const user = req.decoded.id;
  Note.find({ user }, (err, notes) => {
    if (err) return res.status(500).json({ error: 'Could not get notes' });
    res.json(notes);
  });
};

const singleNote = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return sendUserError('Must provide an id');
  }
  Note.findById(id, (err, note) => {
    if (err || note === null)
      return sendUserError('Cannot find note by that id');
    res.json(note);
  });
};

const updateNote = (req, res) => {
  const { title, id, text } = req.body;
  if (!id || !title) {
    res.status(422).json({ error: 'Must Provide an ID and title' });
  }

  Note.findById(id, (err, note) => {
    if (err || note === null) {
      res.status(422).json({ error: 'Cannot find note by that id', err });
    }
    note.title = title;
    note.text = text;
    note.save((saveErr, savedNote) => {
      if (saveErr || note === null) {
        res.status(500);
        res.json({ error: 'Could not save updated note', err });
        return;
      }
      res.json(note);
    });
  });
};

const deleteNote = (req, res) => {
  let id = undefined;
  if (req.params.id) {
    id = req.params.id;
  }
  if (req.body.id) {
    id = req.body.id;
  }
  if (id === undefined) {
    sendUserError('Please provide an ID');
    return;
  }
  Note.findByIdAndRemove(id, (err, removedNote) => {
    if (err) {
      sendUserError('Cannot find note by that id');
      return;
    }
    res.json({ success: `${removedNote.title} was removed from the DB` });
  });
};

module.exports = {
  createNote,
  getAllNotes,
  singleNote,
  updateNote,
  deleteNote,
};
