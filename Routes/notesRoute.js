const router = require('express').Router();
const Note = require('../Models/Note');

router.route('/')
  .get((req, res) => {
    Note.find()
      .then(r => {
        res.json(r);
      })
  })
