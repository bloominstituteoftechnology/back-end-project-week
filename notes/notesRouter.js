const router = require("express").Router();
const nc = require("./notesController.js");

// below 3 lines are for knex usage
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);


// ENDPOINT for each features

// return all notes
router.get("/notes", nc.getNotes);
router.get("/notes/:id", nc.getANote);
router.post("/notes/add", nc.createNote);




module.exports = router;
