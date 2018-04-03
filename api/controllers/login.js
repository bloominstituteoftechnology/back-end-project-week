const jwt = require('jsonwebtoken');
const { secret } = require('../../config');
const User = require('../models/userModel');

const login = async function(req, res) {
  const { username, password } = req.body;
  if (!username || !password) res.status(422).json({ 
    error: "Please provide both a username and a password."
  });
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user === null) {
      res.status(422).json({ error: "That username is not in the database." });
      return;
    }
    const userIsValidated = await user.checkPassword(password);
    if (userIsValidated) {
      const payload = { username: user.username };
      const token = jwt.sign(payload, secret);
      res.json({ token });
    } else {
      res.status(422).json({ error: "Invalid Password!" });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: "Something broke" });
  }
};

module.exports = { login };
