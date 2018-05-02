const User = require('../models');
const { generateToken } = require('../services/auth');

let notes = [
  {
    id: 0,
    title: 'Your First Note',
    body: 'Edit to get started',
  },
];

const registerUser = (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save((err, user) => {
    if (err) return res.send(err);
    res.json({ message: 'Success Registered User Saved', user });
  });
};
