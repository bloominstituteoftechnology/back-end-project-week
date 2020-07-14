const express = require('express');
const router = express.Router();
const Note = require('./Note');
const User = require('../User/User');
const { restricted } = require('../secrets/security');

router.get('/', restricted, (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .populate('notes')
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
