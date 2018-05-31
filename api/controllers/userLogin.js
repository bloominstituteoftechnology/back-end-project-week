const User = require("../models/User.js");

const userLogin = (req, res) => {
  const { username, password, email } = req.body;

  if ((username && password) || (email && password)) {
    user
      .findOne({ username, email })
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
  } else {
    res.status(422).json({
      message: "Please provide a valid username, password, and email address."
    });
  }
};

module.exports = { userRegister };
