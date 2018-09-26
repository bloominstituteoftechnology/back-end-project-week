const express = require("express");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("../jwtConfig");

const router = express.Router();

//create a new user
router.post("/register", async (req, res) => {
  let { username, password, email } = req.body;
  if (!username || !password || !email) {
    res
      .status(422)
      .json({ message: "An email, username, and password is required" });
  } else {
    username = username.toLowerCase();
    password = bcrypt.hashSync(password, 16);
    try {
      const newUser = await db("users")
        .insert({ username, password, email })
        .returning("*");
      const token = jwt.generateToken({ id: newUser.id, username: newUser.username });
      res.status(201).json({ id: newUser.id, username: newUser.username, token });
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

//login a user
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(422)
      .json({ message: "A username and password is required" });
  } else {
    try {
      username = username.toLowerCase();
      const user = await db("users")
        .where({ username })
        .first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.generateToken(user);
        res.status(200).json({
          token,
          username: user.username,
          id: user.id
        });
      } else if (!user) {
        res.status(404).json({ message: "Invalid Username" });
      } else {
        res.status(401).json({ message: "Invalid Password" });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

module.exports = router;
