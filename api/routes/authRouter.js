const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../../data/dbConfig");
const users = require("../../users/usersModel");
const notes = require("../../notes/notesModel");
const tags = require("../../notes/tagsModel");
const { generateToken } = require("../../auth/authenticate");

const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;
  console.log({ user: user });
  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else if (user.username.length > 255) {
    res.status(400).json({ error: "username must not exceed 255 characters" });
  } else if (user.password.length > 255) {
    res.status(400).json({ error: "password must not exceed 255 characters" });
  } else {
    // Hash password using bcrypt
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    db("users")
      .insert(user)
      .then(ids => {
        const id = ids[0];

        return users.fetchByUserName(user.username);
      })
      .then(response => {
        const token = generateToken(response);
        res.status(201).json(token);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

router.post("/login", (req, res) => {
  const user = req.body;

  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else {
    return users
      .fetchByUserName(user.username)
      .first()
      .then(response => {
        console.log({ user: user, response: response });
        if (response && bcrypt.compareSync(user.password, response.password)) {
          const token = generateToken(response);

          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "Incorrect Login Information!" });
        }
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send("failed to logout");
    } else {
      res.status(200).send("logout successful");
    }
  });
});

router.get("/", (req, res) => {
  users
    .fetch()
    .then(users => {
      users[0]
        ? res.status(200).json(users)
        : res
            .status(400)
            .json({ error: "there are currently no users in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve users" });
    });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  users.fetchByUserName(username).then(user => {
    user
      ? res.status(200).json(user)
      : res.status(400).json({ error: "could not retrieve user" });
  });
});

router.get("/:username/notes", (req, res) => {
  const { username } = req.params;
  notes.fetchByUsername(username).then(notes => {
    notes[0]
      ? res.status(200).json(notes)
      : res.status(400).json({ error: "could not retrieve user notes" });
  });
});

router.get("/:username/tags", (req, res) => {
  const { username } = req.params;
  const tagsArray = [];
  notes.fetchByUsername(username).then(notes => {
    notes[0]
      ? notes
          .forEach(note => {
            return tags.fetchTagsByNote(note.id);
          })
          .then(tags => {
            tags[0]
            ? tags.forEach(tag => {
              tagsArray.push(tag);
            }).then(() => {
              res.status(200).json(tagArray)
            })
            : res.status(200).json({ error: "User notes have no tags" });
          })
      : res.status(200).json({ error: "User has no notes" });
  });
});

module.exports = router;
