const express = require("express");
const router = express.Router();
const protected = require("../middleware");
const helpers = require("../helpers");

router
  .route("/")
  .get(protected, helpers.getNotes)
  .post(protected, helpers.addNote);
router
  .route("/:id")
  .get(protected, helpers.getNote)
  .put(protected, helpers.editNote)
  .delete(protected, helpers.deleteNote);

module.exports = router;
