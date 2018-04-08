const { tokenGenerator } = require('../services/auth');
const User = require('../models/userModel');

const login = async function(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(422).json({ 
    error: "Please provide both a username and a password."
  });
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user === null) return res.status(422).json({
      error: "That username is not in the database."
    });

    const userIsValidated = await user.checkPassword(password);
    if (userIsValidated) {
      const payload = { username: user.username, uuid: user._id };
      const token = tokenGenerator(payload);
      return res.json({ user, token });
    } else {
      return res.status(422).json({ error: "Invalid Password!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something broke, check the console." });
  }
};

module.exports = { login };
