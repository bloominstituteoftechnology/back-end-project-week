const User = require('../models/userModel');
const Note = require('../models/noteModel');
const { getTokenForUser } = require('../services/auth');
const userError = process.env.STATUS_USER_ERROR;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err, user) => {
    if (err) res.json(err);
    res.json({ succes: 'New user saved', user });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) res.status(userError)
      .json({ error: 'Invalid Username/Password' });
    if (user === null) res.status(userError)
      .json({ error: 'No user with that username in the DB' });
    user.checkPassword(password, (nonMatch, hasMatch) => {
      if (nonMatch !== null) res.status(userError)
          .json({ error: 'Passwords do not match' });
      if (hasMatch) {
        const token = getTokenForUser({ username: user.username });
        res.json({ token });
      }
    });
  });
};

const getNotes = (req, res) => {
  const { user } = req.body;
  Note.find({}, (err, notes) => {
    if (err) return res.send(err);
    res.send(notes);
  })
}

module.exports = {
  createUser,
  login,
  getNotes
};
