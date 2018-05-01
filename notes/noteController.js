const router = require('express').Router();

const Note = require('./noteModel');

router
  .route('/')

  // Read Notes
  .get((req, res) => {
    Note.find({})
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The notes could not be retrieved.'
        });
      });
  })

  // Create Note
  .post((req, res) => {
    const note = new Note(req.body);
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({
        errorMessage: 'Please provide title and content for the note.'
      });
    }
    note
      .save()
      .then(savedNote => {
        res.status(201).json({ savedNote });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router
  .route('/:id')

  // Read Friend by ID
  .get((req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note === null) {
          res.status(404).json({
            errorMessage: 'The note with the specified ID does not exist.'
          });
        }
        res.status(200).json(note);
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'The note could not be retrieved.' });
      });
  })

  // Delete Note by ID
  .delete((req, res) => {
    Note.findByIdAndRemove(req.params.id)
      .then(note => {
        if (note === null) {
          res.status(404).json({
            errorMessage: 'The note with the specified ID does not exist'
          });
        }
        res.status(200).json(note);
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'The note could not be removed.' });
      });
  })

  // Update Note by ID
  .put((req, res) => {
    const { id } = req.params;
    const update = req.body;
    const { title, content } = update;

    Note.findByIdAndUpdate(id, update)
      .then(note => {
        if (note === null) {
          res.status(404).json({
            errorMessage: 'The note with the specified ID does not exist.'
          });
        } else if (!title || !content) {
          res.status(400).json({
            errorMessage: 'Please provide title and content for the note.'
          });
        }
        res.status(200).json(update);
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'The note could not be modified.' });
      });
  });

module.exports = router;
