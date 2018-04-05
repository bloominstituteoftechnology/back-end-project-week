const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./userModel.js");
const Note = require(".../serverDerp/model.js");

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 13;

const corsOptions = {
    origin: 'http://localhost:2323',
    credentials: true
}

const server = express();
server.use(cors(corsOptions));
server.user(bodyParser.json());

server.use(
    session({
        secret: "antidisestablishmentarianism",
        resave: true,
        saveUninitialized: true
    })
);


//middleware connection

const sendUserError = (err, res) => {
    res.status(STATUS_USER_ERROR);
    if (err && err.message) {
        res.json({ message: err.message, stack: err.stack });
    } else {
        res.json({ error: err });
    }
};

const logIn = (req, res, next) => {
    const { username } = req.session;
    console.log(req.session);
    if (!username) {
        sendUserError("User not logged in", res);
        return;
    }
    User.findOne({ username }, (err, user) => {
        if (err) {
            sendUserError(err, res);
        } else {
            req.user = user;
            next();
        }
    });
};

const verify = (req, res, next) => {
    const path = req.path;
    if (/restricted/.test(path)) {
        
        if (!req.session.username) {
        sendUserError('Unauthorized username', res);
        return;
        }
    }
    next();
};
server.use(verify);

//Auth Routes

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    if ( !username ) {
        sendUserError('please enter proper username');
        return;
    }
    const hashedPw = user.password;
    bcrypt
      .compare(password, hashedPw)
      .then(response => {
        if (!response) throw new Error();
        req.session.username = username;
        req.user = user;
      })
      .then(() => {
        res.json({ success: true, user });
      })
      .catch(error => {
        return sendUserError("User does not exist at that id ", res);
      });
  });

  server.post('/register', (req, res) => {
      User.create(req.body)
      .then(user => res.status(200).json(user))
      .catch(err => res.json({ msg:'User could not be created'}))
  });

  server.post('/logout', (req, res) => {
      if (!req.session.username) {
          sendUserError('User is not logged in', res);
          return 
      }
      req.session.username = null;
      res.json({ success: true });
});

  
  module.exports = { register, logout, login };