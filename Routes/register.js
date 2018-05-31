const express = require('express');
const User = require('../Models/User');
const Note = require('../Models/Note');
const router = express.Router();

router.route('/')
  .post((req, res) => {
    const user = new User(req.body);
    user.save()
      .then(r => {
        console.log(r);
      })

  })
router.route('/note')
  .post((req, res) => {
    const note = new Note(req.body);
    note.save()
      .then(r => {
        console.log(r);
      })
  })
module.exports = router;
