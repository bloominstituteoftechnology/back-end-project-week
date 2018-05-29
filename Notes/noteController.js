const express = require("express");

const Note = require("./noteModel");
const User = require("../Users/userModel");

router.get("/", (req, res) => {
  let query = Note.find();

  query
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


