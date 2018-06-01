const bcrypt = require("bcrypt");

const User = require("../models/User.js");

const userRegister = (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });

  if (username && password && email) {
    user
      .save()
      .then(newUser => {
        // Check to see if user is made
        console.log(newUser);
        res.status(201).json(newUser);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error during registration."
        });
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
