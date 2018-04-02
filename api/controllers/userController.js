const User = require('../models/userModel');
const { sendUserError } = require('../utils/middleware');

const createUser = (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  newUser.save((err, savedUser) => {
    if (err) {
      return sendUserError(err, res);
    }
    res.json({ success: 'New user created', savedUser });
  });
};

module.exports = {
  createUser,
};
