const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");

router.get("/", (req, res) => {
  res.json({test: "testing user router"})
})

module.exports = router;