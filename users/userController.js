const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('./userModel.js');
const config = require('../api/config.js');
const { makeToken } = require('../api/utils/middleware.js');

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ errorMessage: 'Can not find any users!' });
      }
    })
    .catch(err => {
      // only show errors if in development, otherwise, show generic error!!
      if (config.env === 'development') {
        return res.status(500).json(err);
      } else {
        return res.status(500).json({
          errorMessage: 'Encountered an error problem when finding users!',
        });
      }
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(foundUser => {
      if (foundUser) {
        res.status(200).json(foundUser);
      } else {
        res.status(404).json({ errorMessage: 'Can not find that user!' });
      }
    })
    .catch(err => {
      // only show errors if in development, otherwise, show generic error!!
      if (config.env === 'development') {
        return res.status(500).json(err);
      } else {
        return res.status(500).json({
          errorMessage: 'Encountered an error problem when finding the user!',
        });
      }
    });
};

const createUser = (req, res) => {
  // destructure required properties to check if provided
  const { username, password: passwordHash, firstname, lastname } = req.body;

  if (username === undefined || passwordHash === undefined) {
    return res
      .status(400)
      .json({ errorMessage: ' username and password are required' });
  }
  if (firstname === undefined || lastname === undefined) {
    return res
      .status(400)
      .json({ errorMessage: ' firstname and lastname are required' });
  }

  const userInfo = Object.assign(req.body, { passwordHash });

  const user = new User(userInfo);

  user
    .save()
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      // only show errors if in development, otherwise, show generic error!!
      if (config.env === 'development') {
        return res.status(500).json(err);
      } else {
        return res.status(500).json({
          errorMessage: 'Encountered a post error problem!',
        });
      }
    });
};

const changePassword = (req, res) => {
  const { password: passwordHash, id } = req.body;

  if (id !== req.params.id) {
    return res.status(400).json({ errorMessage: 'unexpected error' });
  }

  if (passwordHash === undefined) {
    return res.status(400).json({ errorMessage: 'please provide a password' });
  }

  User.findById(id)
    .then(userToChangePassword => {
      User.update({ _id: id }, { $set: { passwordHash: passwordHash } }, () => {
        res.status(201).json({ message: 'Password was updated' });
      });
    })
    .catch(err => {
      // only show errors if in development, otherwise, show generic error!!
      if (config.env === 'development') {
        return res.status(500).json(err);
      } else {
        return res.status(500).json({
          errorMessage: 'Encountered an update error problem!',
        });
      }
    });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return res
      .status(400)
      .json({ errorMessage: 'provide username and password' });
  }

  User.findOne({ username })
    .then(loginUser => {
      if (loginUser === null) {
        res.status(404).json({ errorMessage: 'Can not find that user!' });
        return;
      }
      // found user now attempt to login
      loginUser.checkPassword(password, function(err, isValid) {
        if (err) {
          res.status(500);
          return config.env === 'development'
            ? res.json(err)
            : res.json({ errorMessage: 'Encountered a login error' });
        }

        if (isValid) {
          const token = makeToken(loginUser);
          const userInfo = {
            username: loginUser.username,
            id: loginUser._id,
            token,
          };
          return res.status(200).json(userInfo);
        }
        res.status(422).json({ errorMsg: 'login incorrect' });
      });
    })

    .catch(err => {
      // only show errors if in development, otherwise, show generic error!!
      if (config.env === 'development') {
        return res.status(500).json(err);
      } else {
        return res.status(500).json({
          errorMessage:
            'Encountered an error problem when logging in the user!',
        });
      }
    });
};

const editUser = (req, res) => {
  // destructure properties to check if attempting to change username and also changing password
  const { username, password } = req.body;

  if (username !== undefined) {
    return res
      .status(400)
      .json({ errorMessage: 'username can not be changed!' });
  }

  // check if password is being changed
  if (password !== undefined) {
    return res
      .status(400)
      .json({ errorMessage: 'password can not be changed here!' });
    // userInfo = Object.assign(req.body, { passwordHash: userInfo.password });
  }

  User.findByIdAndUpdate(req.params.id, req.body)
    .then(userUpdated => {
      if (userUpdated === null) {
        res.status(404).json({ error: 'User could not be updated!' });
      } else {
        // need new data so do another find by id
        User.findById(userUpdated.id)

          .then(updatedUser => {
            res.status(200).json(updatedUser);
          })
          .catch(err => {
            // only show errors if in development, otherwise, show generic error!!
            if (config.env === 'development') {
              return res.status(500).json(err);
            } else {
              return res.status(500).json({
                errorMessage: 'Encountered an update error problem!',
              });
            }
          });
      }
    })
    .catch(err => {
      // only show errors if in development, otherwise, show generic error!!
      if (config.env === 'development') {
        return res.status(500).json(err);
      } else {
        return res.status(500).json({
          errorMessage: 'Encountered an update error problem!',
        });
      }
    });
};

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .select('username firstname lastname')
    .then(deletedUser => {
      if (deletedUser) {
        res.status(200).json(deletedUser);
      } else {
        res.status(404).json({ errorMessage: 'Can not delete that user!' });
      }
    })
    .catch(err => {
      // only show errors if in development, otherwise, show generic error!!
      if (config.env === 'development') {
        return res.status(500).json(err);
      } else {
        return res.status(500).json({
          errorMessage: 'Encountered an error problem when deleting the user!',
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  changePassword,
  login,
  editUser,
  deleteUser,
};
