const express = require("express");
const DB = require("../../../data/helpers/notes");

const ROUTER = express.Router();

// GET /api/notes/all
ROUTER.get("/", (req, res) => {});
// GET /api/notes/:notesID
ROUTER.get("/:notesID", (req, res) => {});
// POST /api/notes/
ROUTER.post("/", (req, res) => {});
// UPDATE /api/notes/:notesID
ROUTER.put("/:notesID", (req, res) => {});
// DELETE /api/notes/:notesID
ROUTER.delete("/:notesID", (req, res) => {});
module.exports = ROUTER;
