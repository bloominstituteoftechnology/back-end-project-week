const express = require('express');

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

// ROUTES/ENDPOINTS

// =================NOTES ENDPOINTS===================

// Add GET ROUTE HANDLER to get the list of notes
router.get('/', (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

// Add POST ROUTE HANDLER to create a note
router.post('/notes', (req, res) => {
  if (!req.body.title || !req.body.textBody){
    return res.status(400).send({ error: "Please provide a valid title and text body for this note." });
  }
  const note = req.body;

  db.insert(note)
    .into('notes')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;