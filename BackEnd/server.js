const express = require("express");
const session = require("express");
const User = require("express-session");
const bcrypt = require("bcrypt");

const cors = require("cors");

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const server = express();
server.use(cors(corsOptions));
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
server.use(
  session({
    secret: "e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re",
    resave: true,
    saveUninitialized: true
  })
);

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

server.post("/login", (req, res) => {
  if (!username) {
    sendUserError("username undefined", res);
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      sendUserError("No user found at that id", res);
      return;
    }
    const hashedPw = user.passwordHash;
    bcrypt
        .compare(password, hashedPw)
        .then(response => {
            if (!response) {
                
            }
        }
        
  });
});
