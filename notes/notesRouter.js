const router = require("express").Router();
const nc = require("./notesController.js");

// below 3 lines are for knex usage
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);


// ENDPOINT for each features

// return all notes
router.get("/notes", nc.getNotes);

// return a note with matching id
router.get("/notes/:id", nc.getANote);

// add a new note
router.post("/addnote", nc.createNote);

// edit a note
router.put("/notes/:id", nc.editNote);

// delete a note with the matching id
router.delete("/notes/:id", nc.deleteNote);



module.exports = router;
