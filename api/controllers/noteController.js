const Note = require('../models/noteModel');
const { sendUserError } = require('../utils/middleware');

const createNote = (req, res) => {
  const { title, text } = req.body;
  const myNote = new Note({ title, text });
  myNote
    .save()
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      sendUserError('Error saving data to the DB', err);
    });
};

const getAllNotes = (req, res) => {
  Note.find({}, (err, notes) => {
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
    return sendUserError('Must Provide an ID and title');
  }

  Note.findById(id, (err, note) => {
    if (err || note === null) {
      return sendUserError('Cannot find note by that id');
    }
    note.title = title;
    note.text = text;
    note.save((saveErr, savedNote) => {
      if (err || note === null) {
        res.status(500);
        res.json({ error: 'Could not save updated note' });
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
