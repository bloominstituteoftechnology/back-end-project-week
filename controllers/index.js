const User = require('../models');
const { requireAuth, getTokenForUser } = require('../services/auth');

const createUser = (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save((err, user) => {
    if (err) return res.send(err);
    res.json({
      success: 'User saved',
      user
    });
  });
};

const getUsers = (req, res) => {
  // This controller will not work until a user has sent up a valid JWT
  // check out what's going on in services/index.js in the `validate` token function
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Invalid Email/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that email in our DB' });
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      // This is an example of using our User.method from our model.
      if (nonMatch !== null) {
        res.status(422).json({ error: 'passwords dont match' });
        return;
      }
      if (hashMatch) {
        const token = getTokenForUser({ email: user.email });
        res.json({ token });
      }
    });
  });
};

module.exports = {
  createUser,
  getUsers,
  login
};
