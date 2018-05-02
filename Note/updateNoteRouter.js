const express = require('express');
const router = express.Router();
const Note = require('./Note');
const User = require('../User/User');
const { restricted } = require('../secrets/security');

router.put('/', restricted, (req, res) => {
  const { _id, title, body } = req.body;
  let update;
  if (title && body) {
    update = { title, body };
  } else if (title) {
    update = { title };
  } else if (body) {
    update = { body };
  } else {
    res
      .status(400)
      .json({ message: 'Title or Body required to update something.' });
  }
  Note.findByIdAndUpdate(_id, update).then(oldNote => {
    User.findById(req.user._id)
      .select('-_id notes')
      .populate('notes')
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  });
});

module.exports = router;
