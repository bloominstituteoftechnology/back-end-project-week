const express = require('express');
const router = express.Router();
const dbhelpers = require("../dbhelpers/helpers");


router.get("/", async (req, res) => {
  let results = await dbhelpers.getNotes();
  res.status(200).json(results);
});
router.get("/:id", async (req, res) => {
  try {
    let results = await dbhelpers.getSingleNote(req.params.id);
    if (results.length === 0) {
      res.status(400).json({ errorMessage: "ID does not excist" });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).json({ errorMessage: "Invalid body" });
    return;
  }
  try {
    const newID = await dbhelpers.addNote(req.body);
    const results = await dbhelpers.getSingleNote(newID[0]);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id", async (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).json({ errorMessage: "Invalid body" });
    return;
  }
  try {
    const result = await dbhelpers.editNote(req.params.id,req.body);
    if (result === 0) {
      res.status(400).json({ errorMessage: "ID does not excist" });
      return;
    }
    const editedDBentry = await dbhelpers.getSingleNote(req.params.id);

    res.status(200).json(editedDBentry);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let results = await dbhelpers.deleteNote(req.params.id);
    if (results === 0) {
      res.status(400).json({ errorMessage: "ID does not excist" });
      return;
    }
    res.status(200).json({message:"Delete Successful"});
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router
