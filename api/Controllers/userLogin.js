const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const mysecret = 'Why can’t banks keep secrets? There are too many tellers!';

const userLogin = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username })
      .then(user => {
        user.checkPassword(password, (nonMatch, hashMatch) => {
          if (nonMatch !== null) {
            res.status(422).json({ Error: 'Password is incorrect!' });
          } else if (nonMatch === null && hashMatch) {
            const payload = { username, id: user._id };
            const token = jwt.sign(payload, mysecret);
            res.status(200).json({ token, id: user._id });
          } else {
            res.status(500).json(`SOMETHING IS REALLY WRONG`);
          }
        });
      })
      .catch(err => {
        res.status(500).json({ Error: `Unable to login:`, err });
      });
  } else {
    res.status(422).json({ Error: 'Username and Password required.' });
  }
};

module.exports = userLogin;
