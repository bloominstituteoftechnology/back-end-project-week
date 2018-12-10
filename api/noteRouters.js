const express = require("express");
const router = express.Router();

const db = require("../database/helpers/notesModel");

// ====================== ENDPOINTS ======================
// GET notes
router.get("/", (_, res) => {
  db.get()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json({ message: "Error fetching" }, err));
});

module.exports = router;
