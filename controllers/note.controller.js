const Note = require('../models/Note');

/**
 * Creating a new note
 */
exports.create = (req, res) => {
  // validation
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Please fill in all of the values'
    });
  }

  // Create note
  const note = new Note({
    title: req.body.title || 'Untitled note',
    content: req.body.content
  });

  // save note in database
  note
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not create note'
      });
    });
};

/**
 * Getting all notes
 */
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not retrieve notes'
      });
    });
};

/**
 * Retrieving single note by Id
 */
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving note with id ' + req.params.noteId
      });
    });
};

/**
 * Updating a note by Id
 */
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content can not be empty'
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || 'Untitled Note',
      content: req.body.content
    },
    { new: true }
  )
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Error updating note with id ' + req.params.noteId
      });
    });
};

/**
 * Updating a note by Id
 */
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      res.send({ message: 'Note deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Could not delete note with id ' + req.params.noteId
      });
    });
};
