const User = require('../models/user');

const createUser = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => {
      res.status(201).json({ message: 'User Created Successfully', user });
    })
    .catch((error) => {
      res.status(422).json({ message: 'Error Creating User', error });
    });
};

const loginUser = (req, res) => {
  User.findOne(req.body)
    .then((user) => {
      res.status(200).json({ message: 'User Logged In', user });
    })
    .catch((error) => {
      res.status(422).json({ message: 'User Log In Failed', error });
    });
};

const logoutUser = (req,res) => {
    User.findOne(req.body)
    .then((user) => {
        res.status(200).json({message: 'User Logged Out', user})
    })
    .catch(error => {
        res.status(422).json({message: 'User Log Out Failed', error})
    })
}

module.exports = {
  createUser,
  loginUser,
  logoutUser
};
