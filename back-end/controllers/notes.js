const Note = require('../models/note');

const createNote = (req, res) => {
  const newNote = new Note(req.body);

  newNote
    .save()
    .then((savedNote) => {
      res.status(201).json({ message: 'New Note Created', savedNote });
    })
    .catch((error) => {
      res.status(422).json({ message: 'Error Creating Note', error });
    });
};

const getNotes = (req, res) => {
  Note.find({})
    .then((foundNotes) => {
      res.status(200).json({ message: 'Your Notes', foundNotes });
    })
    .catch((error) => {
      res.status(422).json({ message: 'Error Retrieving Notes', error });
    });
};

const getNote = (req, res) => {
  Note.findById(req.params.id)
    .then((foundNote) => {
      res.status(200).json({ message: 'The Note You Requested', foundNote });
    })
    .catch((error) => {
      res.status(422).json({ message: 'Error Retrieving Note', error });
    });
};

const updateNote = (req, res) => {
  Band.findbyIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedNote) => {
      res.status(200).json({ message: 'Note Has Been Updated', updatedNote });
    })
    .catch((error) => {
      res.status(422).json({ message: 'Error Updating Note', error });
    });
};

const deleteNote = (req, res) => {
  Band.findByIdAndRemove(req.params.id)
    .then((deletedNote) => {
      res
        .status(200)
        .json({ message: 'Note Deleted Successfully', deletedNote });
    })
    .catch((error) => {
      res.status(422).json({ message: 'Error Deleting Note', error });
    });
};

module.exports = {
  createNote,
  getNote,
  getNotes,
  updatedNote,
  deleteNote,
};
