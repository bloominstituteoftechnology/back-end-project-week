const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const { secret } = require("../utils/config");

const userLogin = (req, res) => {
  const { username, password, email } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      console.log("LOGIN TEST");
      res.status(422).json({
        error: "Invalid login."
      });
    }

    // Check pw and return token if valid
    user.checkPassword(password, (error, isMatch) => {
      if (error) {
        res.status(422).json({
          error: "YOU SHALL NOT PASS!"
        });
      }
      if (isMatch) {
        const payload = {
          username: user.username
        };
        const token = jwt.sign(payload, secret);
        res.json({ 
          token,
           message: `Welcome back ${user.username}!` });
      }
    });
  });
};
module.exports = {
  userLogin
};
