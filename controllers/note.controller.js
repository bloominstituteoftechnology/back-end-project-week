const Note = require('../models/noteModels');

const mongoose = require('mongoose');

const getNotes = (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.status(422);
      res.json({ error: 'Error finding all the notes:' });
      return;
    }
    res.status(200);
    res.json(notes);
  });

};

const addNote = (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  newNote.save(newNote, (err, note) => {
    if (err) {
      res.status(422);
      res.json({ error: 'Error creating a new note' });
      return;
    }
    res.json(note);
  });
}

const viewNote = (req, res) => {
  // once you have user working this route
  // will use populate and ref the notes 'scribe'
  const { id } = req.params;
  Note.findById(id)
    .exec((err, note) => {
      if (err) {
        res.status(422);
        res.json({ error: 'Error accessing note.' });
        return;
      }
      res.json(note);
    });
};

const editNote = (req, res) => {
  Note.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, note) => {
    if (err) {
      res.status(422);
      res.json({ error: 'Erro updating the note' });
      return;
    }
    res.json(note);
  });
};

// const deleteNote = (req, res) => {

// }

module.exports = { getNotes, addNote, viewNote, editNote };