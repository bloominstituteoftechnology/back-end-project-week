const express = require("express");
const tagsDB = require("../data/db.js");

const router = express.Router();

function tagProtect(req, res, next) {
  if (!req.body.title || !req.body.note_id) {
    res.status(400).json({ error: "Please insert a title and note id for the tag" });
  } else {
    next();
  }
}

router.get("/", async (req, res) => {
  try {
    const tags = await tagsDB.select().from("tags");
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await tagsDB
      .select()
      .from("tags")
      .where({ id })
      .first();
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(400).json({ error: "The tag with the id could not be found." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", tagProtect, async (req, res) => {
  const addTag = req.body;
  try {
    const ids = await tagsDB.insert(addTag).into("tags");
    res.status(201).json(ids[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
