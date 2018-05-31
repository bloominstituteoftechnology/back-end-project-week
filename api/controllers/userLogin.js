const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const { secret } = require("../utils/config");

const userLogin = (req, res) => {
  const { password, email } = req.body;

  // Search for user via email, verify this works
  User.findOne({ email }),
    (error, user) => {
      if (error) {
        res.status(403).json({
          error: "Invalid login credentials."
        });
        return;
      }
      if (!email) {
        res.status(422).json({
          error: "Could not find user in database."
        });
        return;
      }
      // Check pw and return token if valid
      User.checkPassword(password),
        (nonMatch, isMatch) => {
          if (nonMatch) {
            res.status(422).json({
              error: "YOU SHALL NOT PASS!"
            });
          }
          if (isMatch) {
            const payload = {
              username: user.username
            };
            const token = jwt.sign(payload, secret);
            res.json({ token });
          }
        };
    };
};

module.exports = {
  userRegister
};
