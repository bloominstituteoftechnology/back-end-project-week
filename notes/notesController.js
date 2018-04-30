const express = require("express");
const router = express.Router();

const Note = require("./notesModel.js");

router.route("/").get((req, res) => {
  res.json(req.body);
});
