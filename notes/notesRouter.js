const router = require("express").Router();
const nc = require("./notesController.js");

// below 3 lines are for knex usage
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);


// router.post("/notes/add", nc.addNote);
// router.get("/notes/", project.getNotes);



module.exports = router;
