const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;
    
  if(!username || !password) {
    res.status(401).json({ message: 'Username and password required.' });
  }
  const newUser = new User(req.body) 
    newUser
      .save()
      .then(savedUser => res.status(201).json(savedUser))
      .catch(err => res.status(500).json(err));
};


module.exports = {
  createUser
};
