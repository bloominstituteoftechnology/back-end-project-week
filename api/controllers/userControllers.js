const mongoose = require("mongoose");
const models = require("./models");
const bcrypt = require('bcrypt');
const session = require('express-session');

const BCRYPT_COST = 11;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new models.User({ username, password });

  newUser
    .save()
    .then(user => {
      res.json({
        username: user.username,
        notes: user.notes
      });
    })
    .catch(err => {
      console.log(err);
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
      req.body.password = Pw;
      next();
    })
    .catch((err) => {
        throw new Error(err);
    });
};

const loginUser = (req, res, next) => {
  const { username, password } = req.body;
  
  if(!username) {
    res.error("Usernmae not given"); 
  }
  const lowercaseUsername = username.toLowerCase();
  
  models.User 
    .findOne({ username: lowercaseUsername })
    .exec()
    .then(user => {
      if(!user) res.json({ message:  'User does not exist'});
      else {
        const hwPassword = user.password;
        bcrypt.compare(password, hwPassword)
        .then(result => {
          if(!result) throw new Error();
          req.session.username = username; 
          req.session.id = user._id;
          req.user = user;
        })
        .then(() => {
          res.json({ success: true });
        })
        .catch(err => {
          console.log("Could not Login");
          res.error(err);
        });
      }
    })
    .catch(err => {
      console.log("Could not Login");
      res.error(err);
    });
};

const whoAmI = (req,res)=> {
  res.json({
    username: req.session.username
  });
}
const logOut = (req, res) => {
  if(!req.session.username) res.send('User not logged in or session expired');
  //req.session.username = null;
  req.session.destroy();
};

// const restrictedPermissions = (req, res, next) => {
//   const path = req.path;
//   if (/restricted/.test(path)) {
//       if(!req.session.username) {
//           sendUserError('user not authorized', res);
//           return;
//       }
//   } next();
// };
module.exports = {
  createUser,
  loginUser,
  hashPw,
 // restrictedPermissions,
  logOut,
  whoAmI,
};
