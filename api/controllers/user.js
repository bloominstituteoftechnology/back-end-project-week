const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async function(req, res) {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const savedUser = await user.save();
    res.json({ status: 'success', savedUser });
  }
  catch (err) {
    res.json({ status: err });
  };
};

module.exports = { createUser }
