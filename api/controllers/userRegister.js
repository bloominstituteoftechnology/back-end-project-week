const bcrypt = require("bcrypt");

const User = require("../models/User.js");

// ====== POST /api/register =====
// Username, password, email required
// Username and email must be unique!
const userRegister = (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });

  if (username && password && email) {
    user
      .save()
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  if (!username || !password || !email) {
    res.status(422).json({
      message: "Please provide a valid username, password, AND email address."
    });
  }
};

module.exports = {
  userRegister
};
