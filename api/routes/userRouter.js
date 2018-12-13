const express = require("express");
const db = require("../../data/helpers/userDb.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = require("../_secrets/keys").jwtKey;

function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: "FSW13",
    role: "admin"
  };

  const jwtOptions = {
    expiresIn: "1h"
  };

  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

router.get("/", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await users.find(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/register", (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;
  db("users")
    .add(credentials)

    .then(ids => {
      const id = ids[0];
      const token = generateToken({ username: credentials.username });
      res.status(201).json({ newUserId: id, token });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  const creds = req.body;

  users
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Logged in as ${user.username}`, token });
      } else {
        res.status(401).json({ message: "You are NOT authorized!!" });
      }
    })
    .catch(err => res.status(500).json({ err }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  users
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No user found to update" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "user not found to delete!" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
