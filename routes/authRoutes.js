const express = require("express");
const bcrypt = require("bcryptjs");
const authHelper = require("../auth/index.js");
const helper = require("../data/usersHelpers");

const router = express.Router();

router.route("/register").post(async (req, res, next) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res
      .status(422)
      .json({ message: "Please provide a username and a password." });
  }
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  try {
    const idArray = await helper.addUser(creds);
    const id = idArray[0];
    const user = await helper.getUser(id).first();
    const token = authHelper.generateToken(user);
    res.status(201).json({ id: user.id, token });
  } catch (err) {
    if (err.errno === 19) {
      res.status(409).json({
        message: "Oh no! That username is taken, please try another. "
      });
    } else {
      next(err);
    }
  }
});

router.route("/login").post(async (req, res, next) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res
      .status(422)
      .json({ message: "Please provide a username and a password." });
  }
  try {
    const user = await helper.getUserByUsername(creds.username).first();
    if (user) {
      const isValid = await bcrypt.compare(creds.password, user.password);
      if (isValid) {
        const token = authHelper.generateToken(user);
        res.status(200).json({
          id: user.id,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(404).json({ message: "Invalid username." });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
