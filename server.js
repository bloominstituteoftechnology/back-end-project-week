const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "Who but me? Loves JWT";

const Note = require("./models/Note");
const User = require("./models/User");

const loginInfo = require("./loginInfo");

mongoose
  .connect(
    `mongodb://${loginInfo.username}:${
      loginInfo.password
    }@ds033175.mlab.com:33175/lambda-notes`
  )
  .then(() => console.log("\n... API Connected to Database ...\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n", err));

const port = process.env.PORT || 3333;

const server = express();

server.use(express.json());
server.use(cors({}));

server.get("/", (req, res) => {
  res.json({ Message: "Hello World" });
});

// Authentification and token stuff

const getTokenForUser = user => {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  };
  const options = {
    expiresIn: "24h"
  };
  return jwt.sign(payload, secret, options);
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  const username = req.headers.username;
  if (!token) {
    res
      .status(422)
      .json({ error: "No authorization token found on Authorization header" });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ error: "Token invalid, please login", message: err });
      } else {
        // User.findOne({ username: username, token: token })
        //   .then(res => {
        //     next();
        //   })
        //   .catch(err => {
        //     res
        //       .status(500)
        //       .json({ error: "This token is for the wrong user!" });
        //   });
        next();
        User.findOne({ token }, (err, user) => {
          if (err) {
            return res.status(500).json({ error: "Invalid Username/Password" });
          }

          if (!user) {
            return res
              .status(422)
              .json({ error: "No user with that username in our DB" });
          }
          if (user.checkToken(token) === true) {
            next();
          } else {
            res.status(422).json({
              error: "tokens dont match",
              token: token,
              USERTOKEN: user.token,
              returnCheckToken: user.checkToken(token)
            });
          }
        });
      }
    });
  }
};

server.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  user.save((err, user) => {
    if (err) return res.status(500).send(err);

    const token = getTokenForUser({ username: user.username });
    res.json({ token });
  });
});

// server.get("/users", validateToken, (req, res) => {
//   User.find({})
//     .select("username")
//     .then(users => {
//       res.send(users);
//     })
//     .catch(err => {
//       return res.send(err);
//     });
// });

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .checkPassword(password)
          .then(isMatch => {
            if (isMatch) {
              const token = getTokenForUser({ username: user.username });
              const userData = {
                id: user._id,
                username: user.username
              };
              res.json({ userData, token });
            } else {
              return res.status(422).json({ error: "passwords dont match" });
            }
          })
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err));
});

// Note routes ========================================================

server.get("/testnotes", (req, res) => {
  Note.find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get notes." });
    });
});

server.get("/testnotes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a note for that id." });
    });
});

// Test routes for finding and editing notes for a specific user ===================================

server.get("/notes/:username", validateToken, (req, res) => {
  // User.find({ username: req.params.username }).then(res => {
  //   if(res.data.token === localStorage.get('token')){
  //     Note.find({ username: req.params.username })
  //     .then(notes => {
  //       res.status(200).json(notes);
  //     })
  //     .catch(err => {
  //       res.status(500).send({ errorMessage: "Could not get notes." });
  //     });
  //   }
  // })
  Note.find({ username: req.params.username })
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).send({ errorMessage: "Could not get notes." });
    });
});

server.get("/notes/:username/:id", validateToken, (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .where("username")
    .equals(req.params.username)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a note for that id." });
    });
});

server.post("/notes/:username", validateToken, (req, res) => {
  const newNote = new Note(req.body);
  if (newNote.username === req.params.username) {
    newNote
      .save()
      .then(note => {
        res.status(201).json(note);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Could not post note." });
      });
  } else res.status(500).json({ errorMessage: "Could not post note." });
});

server.put("/notes/:username/:id", validateToken, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const options = {
    new: true
  };
  if (!changes.title && !changes.content) {
    return res
      .status(422)
      .json({ errorMessage: "Please add a title and/or content field." });
  }
  Note.findById(id)
    .where("username")
    .equals(req.params.username)
    .then(note => {
      Note.findByIdAndUpdate(id, changes, options)
        .then(note => {
          if (!note) {
            return res
              .status(404)
              .json({ errorMessage: "No note with that id could be found." });
          } else res.status(200).json(note);
        })
        .catch(err => {
          res
            .status(500)
            .json({ errorMessage: "Could not update a note with that id." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a note for that id." });
    });
});

server.delete("/notes/:username/:id", validateToken, (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .where("username")
    .equals(req.params.username)
    .then(note => {
      Note.findByIdAndRemove(id)
        .then(note => {
          if (!note) {
            return res
              .status(404)
              .json({ errorMessage: "No note with that id could be found." });
          } else res.status(200).json(note);
        })
        .catch(err => {
          res
            .status(500)
            .json({ errorMessage: "Could not delete a note with that id." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a note for that id." });
    });
});

//User routes ========================================================

server.get("/users", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get users." });
    });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a user for that id." });
    });
});

server.put("/users/:id", validateToken, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const options = {
    new: true
  };
  if (!changes.username && !changes.password && !changes.token) {
    return res
      .status(422)
      .json({ errorMessage: "Please add a username and/or password field." });
  }
  User.findById(id)
    .then(user => {
      User.findByIdAndUpdate(id, changes, options)
        .then(user => {
          if (!user) {
            return res
              .status(404)
              .json({ errorMessage: "No user with that id could be found." });
          } else res.status(200).json(user);
        })
        .catch(err => {
          res
            .status(500)
            .json({ errorMessage: "Could not update a user with that id." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a user for that id." });
    });
});

server.delete("/users/:id", validateToken, (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      User.findByIdAndRemove(id)
        .then(user => {
          if (!user) {
            return res
              .status(404)
              .json({ errorMessage: "No user with that id could be found." });
          } else res.status(200).json(user);
        })
        .catch(err => {
          res
            .status(500)
            .json({ errorMessage: "Could not delete a user with that id." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a user for that id." });
    });
});

server.listen(port, err => {
  if (err) console.log(err);
  else {
    console.log(`Magic happening on ${port}`);
  }
});
