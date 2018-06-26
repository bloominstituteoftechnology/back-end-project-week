const express = require('express');
const router = express.Router();

const Notes = require('../models/notesModel.js')
// get notes
router
  .route('/')
  .get((req, res) => {
    Notes
      .find()
      .then(note => {
        res.status(200).json({
          note
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: err
        })
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    const {
      id
    } = req.params;
    Notes
      .findById(id)
      .then(note => {
        res.status(200).json({
          note
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: err
        })
      })
  })
// post notes
router
  .route('/note')
  .post((req, res) => {
    const {
      title,
      content
    } = req.body;
    const newNote = new Notes({
      title,
      content
    });
    newNote
      .save()
      .then(note => {
        res.status(201).json({
          note
        })
      })
      .catch(err => {
        conole.log(err)
        res.status(500).json({
          errorMessage: err
        })
      })
  })
// edit notes
router
  .route('/:id')
  .put((req, res) => {
    const {
      id
    } = req.params;
    Notes
      .findByIdAndUpdate(id)
      .then(updatedNote => {
        res.status(201).json({
          updatedNote
        })
      })
      .catch(err => {
        conole.log(err)
        res.status(500).json({
          errorMessage: err
        })
      })
  })
// delete notes
router
  .route('/:id')
  .delete((req, res) => {
    const {
      id
    } = req.params;
    Notes
      .findByIdAndRemove(id)
      .then(deletedNote => {
        res.status(201).json({
          deletedNote
        })
      })
      .catch(err => {
        conole.log(err)
        res.status(500).json({
          errorMessage: err
        })
      })
  });

module.exports = router;