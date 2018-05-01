const express = require('express');
const router = express.Router();
const Note = require('./Note');
const { restricted } = require('../secrets/security');

router.get('/', restricted, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
