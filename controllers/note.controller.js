const Note = require('../models/note');
const mongoose = require('mongoose');

const getNotes = (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.status(422).json({ error: 'Error finding all the notes:' });
      return;
    }
    res.status(200).json(notes);
  });

};

const addNote = (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  newNote.save(newNote, (err, note) => {
    if (err) {
      res.status(422).json({ error: 'Error creating a new note' });
      return;
    }
    res.status(201).json(note);
  });
}

const viewNote = (req, res) => {
  // once you have user working this route
  // will use populate and ref the notes 'scribe'
  const { id } = req.params;
  Note.findById(id)
    .exec((err, note) => {
      if (err) {
        res.status(422).json({ error: 'Error accessing note.' });
        return;
      }
      res.status(200).json(note);
    });
};

const editNote = (req, res) => {
  Note.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, note) => {
    if (err) {
      res.status(422).json({ error: 'Error updating the note' });
      return;
    }
    res.json(note);
  });
};

const deleteNote = (req, res) => {
  Note.findByIdAndRemove(req.params.id, (err, note) => {
    if (err) {
      res.status(422).json({ error: 'Error deleting the note'});
      return;
    }
    res.json({ success: `Note titled ${note.title} has been deleted from the database.`})
  })
}

module.exports = { getNotes, addNote, viewNote, editNote, deleteNote };