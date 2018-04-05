const mongoose = require("mongoose");
const userModel = require("../models/Users");
const bcrypt = require('bcrypt');

const BCRYPT_COST = 11;

const createUser = (req, res) => {
  const { userName, passWord } = req.body;
  const newUser = new userModel({ userName, passWord });
  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Not able to create new user" });
    });
};

const hashPw = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
    sendUserError('Gimme a password.', res);
    return;
  } 
    bcrypt.hash(password, BCRYPT_COST)
    .then((Pw) => {
      req.password = Pw;
      next();
    })
    .catch((err) => {
        throw new Error(err);
    });
};

const loginUser = (req, res, next) => {
  const { username } = req.session;
  if(!username) {
      sendUserError('User is not logged in', res);
      return;
  }
  userModel 
    .findOne({ userName })
    .exec()
    .then(user => {
      if(!user) res.json({ message:  'User does not exist'});
      else res.json(user);
      next();
    });
};

const restrictedPermissions = (req, res, next) => {
  const path = req.path;
  if (/restricted/.test(path)) {
      if(!req.session.username) {
          sendUserError('user not authorized', res);
          return;
      }
  } next();
};
module.exports = {
  createUser,
  loginUser,
  hashPw,
  restrictedPermissions,
};
