const express = require("express");
const router = express.Router();
const db = require("../db/dbHelper/index");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      notes: await db.getNotes()
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      note: await db.getNote(req.params.id)
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log('~~~~~~~~~~~~~~~~~~~')
    console.log('req body', req.body)
    await db.addNote(req.body);
    res.status(200).json({
      status: true,
      updatedNotes: await db.getNotes()
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await db.putNote({ id: req.params.id, ...req.body });
    res.status(200).json({
      status: true,
      updatedNotes: await db.getNotes()
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db.delNote(req.params.id);
    res.status(200).json({
      status: true,
      updatedNotes: await db.getNotes()
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
