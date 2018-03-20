const Note = require('../models/note');
const User = require('../models/user');

const getNotes = (req, res) => {
  if (!req.decrypted) {
    res.status(404).json({err: 'Please log in to see notes'});
  } else {
    User.findOne({ username: req.username })
    .then(user => {
      id = user._id;
      Note.find({ author: id })
        .then(note => {
          res.json(note);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }
};

const addNote = (req, res) => {
  const { title, body } = req.body;
  const author = req.author;
  const username = req.username;

  if (!req.decrypted) {
    res.status(404).json({err: 'Please log in to see notes'});
  } else {
    User.findOne({ username })
      .then(user => {
        const newNote = new Note({
          title,
          body,
          author: user._id
        });
        newNote.save()
          .then(note => {
            res.status(201).json({ success: 'Note added successfully'});
          })
          .catch(err => {
            res.status(500).json(err);
          })
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
};

const updateNote = (req, res) => {
  const { id, title, body } = req.body;
  const updateNote = {
    title, 
    body,
  }

  if (!req.decrypted) {
    res.status(404).json({err: 'Please login to see notes'});
  } else {
    Note.findByIdAndUpdate(id, updateNote)
      .then(note => {
        res.status(201).json({ success: 'Note updated successfully'});
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
};

const deleteNote = (req, res) => {
  const { id } = req.body;

  if (!req.decrypted) {
    res.status(404).json({err: 'Please login to see notes'});
  } else {
    Note.findByIdAndRemove(id)
      .then(note => {
        res.json({ success: 'Note deleted successfully'});
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
};

module.exports = {
  getNotes,
  addNote,
  updateNote, 
  deleteNote
}