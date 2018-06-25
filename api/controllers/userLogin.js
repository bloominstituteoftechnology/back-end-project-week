const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const { secret } = require("../utils/config");

// ====== POST /api/login =====
// Remember to sign in with email/password!
const userLogin = (req, res) => {
  const { username, password, email } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(500).json({
          error: "Invalid login."
        });
      }

      // Check pw and return token if valid
      user.checkPassword(password, (error, isMatch) => {
        if (isMatch) {
          const payload = {
            username: user.username
          };
          const token = jwt.sign(payload, secret);
          res.json({
            token,
            message: `Welcome back ${user.username}!`
          });
        } else {
          res.status(422).json({
            error: "YOU SHALL NOT PASS!"
          });
        }
        
      });
    })
 ;
};
module.exports = {
  userLogin
};
