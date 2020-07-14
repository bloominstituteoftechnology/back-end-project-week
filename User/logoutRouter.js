const express = require('express');
const router = express.Router();
const User = require('./User');

router.get('/', (req, res) => {
  res.json({ message: `This page doesn't exist yet!` });
});

module.exports = router;
