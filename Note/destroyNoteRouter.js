const express = require('express');
const router = express.Router();
const Note = require('./Note');
const User = require('../User/User');
const { restricted } = require('../secrets/security');

router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;
  let { notes, _id } = req.user;
  console.log(notes, 'before');
  console.log(id, 'id');
  notes = notes.filter(note => note.toString() !== id);

  User.findByIdAndUpdate(_id, { notes })
    .then(user => {
      User.findById(user._id)
        .select('-password')
        .populate('notes')
        .then(finalUser => {
          Note.findByIdAndRemove(id).then(destroyedNote => {
            res.json(finalUser);
          });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
