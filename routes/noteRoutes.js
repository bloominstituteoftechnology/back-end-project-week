"use strict";
const express = require("express");
const helpers = require("../db/dbHelper/helpers.js");
const router = express.Router();

// test route
// router.get("/", (req, res, next) => {
//   res.status(200).json({ message: "Working API" });
// });

// start GETS
router.get("/", (req, res, next) => {
  helpers
    .getNotes()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      err.code = 500;
      next(err);
    });
});

module.exports = router;
