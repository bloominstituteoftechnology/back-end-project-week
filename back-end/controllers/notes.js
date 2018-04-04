const Note = require('../models/note');
const User = require('../models/user');

const createNote = (req, res) => {
  if (req.decoded.username === req.body.username) {
    const { userId } = req.params;
    const newNote = new Note({ ...req.body, user: userId });

    User.findById(userId).then((user) => {
      newNote
        .save()
        .then((savedNote) => {
          res.status(201).json({ message: 'New Note Created', savedNote });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Creating Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

const getNotes = (req, res) => {
  if (req.decoded.username === req.body.username) {
    const { userId } = req.params;
    User.findById(userId).then((user) => {
      Note.find({ user: userId })
        .then((foundNotes) => {
          res.status(200).json({ message: 'Your Notes', foundNotes });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Retrieving Notes', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

const getNote = (req, res) => {
  if (req.decoded.username === req.body.username) {
    const { userId, noteId } = req.params;
    User.findById(userId).then((user) => {
      Note.findById(noteId)
        .then((foundNote) => {
          res
            .status(200)
            .json({ message: 'The Note You Requested', foundNote });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Retrieving Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

const updateNote = (req, res) => {
  if (req.decoded.username === req.body.username) {
    const { userId, noteId } = req.params;
    const updates = req.body;
    User.findById(userId).then((user) => {
      Note.findByIdAndUpdate(noteId, updates, { new: true })
        .then((updatedNote) => {
          res
            .status(200)
            .json({ message: 'Note Has Been Updated', updatedNote });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Updating Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

const deleteNote = (req, res) => {
  if (req.decoded.username === req.body.username) {
    const { userId, noteId } = req.params;
    User.findById(userId).then((user) => {
      Note.findByIdAndRemove(noteId)
        .then((deletedNote) => {
          res
            .status(200)
            .json({ message: 'Note Deleted Successfully', deletedNote });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Deleting Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

module.exports = {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
};
