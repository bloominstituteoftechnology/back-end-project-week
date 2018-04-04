const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const User = require("./src/models/User");
const server = express();
server.use(express.json());

const corsOptions = {
  "origin": "http://localhost:3000",
  "credentials": true
};

server.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/notes")
  .then(connect => {
    console.log("Connected to mongo database");
  })
  .catch(err => {
    console.log(err);
  });

server.use(
  session({
    secret: "e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re",
    resave: true,
    saveUninitialized: false
  })
);

const PORT = 5000;

// ===User manipulation functionality=== 

server.post("/api/users", (req, res) => {
  console.log("Post recieved for user on server", req.body);
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(422).json({ error: "Need username and password" });
  }
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  // TODO: check if username exists
  user.save((err, user) => {
    if (err) return res.send(err);
    res.json({
      success: "User saved",
      user
    });
  });
});

server.get("/api/users", (req, res) => {
  console.log("Get request recieved on server");
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
});

// ===Log-in functionality===

server.post("/login", (req, res) => {
  console.log("Post request recieved to log in on server", req.body);
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Invalid Username/Password" });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: "User does not exist in database" });
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      if (nonMatch !== null) {
        res.status(422).json({ error: "passwords dont match" });
        return;
      }
      if (hashMatch) {
        req.session.ID = user._id;
        res.json("login success!");
      }
    });
  });
});

server.post("/logout", (req, res) => {
  if (!req.body.username) {
    res.status(422).json({ error: "Need username" });
  }
  let { username } = req.body;
  username = username.toLowerCase();
  User.findOne({ username })
    .then(user => {
      const foundUserID = JSON.stringify(user._id).replace(/"/g, "");
      console.log("userid", foundUserID);
      console.log("sessionid", req.session.ID);

      if (foundUserID === req.session.ID) {
        req.session.ID = null;
        res.status(200).json({ success: true });
      }
      console.log("tried to find user");
    })
    .catch(err => {
      sendUserError(err, res);
    });
});

// ===Blank functionality===

// eventually will store all routes in another file, once they are all built.
// routes(server);

server.listen(PORT, (req, res) => {
  console.log("Server listening on: ", PORT);
});
