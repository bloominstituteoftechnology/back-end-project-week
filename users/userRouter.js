const express = require('express');

const User = require('./User.js');

const router = express.Router();

router
  .route('/')
  .post((req, res) => {
    const { username, password } = req.body;
    if (!title || !budgetAmount) {
        res.status(400).json({ errorMessage: "Please provide username and password." })
        return;
    }
    const newUser = new User({ username, password });
    newUser.save() // filter, .select(), .where(), .sort()
      .then(result => res.json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;