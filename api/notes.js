const express = require("express");
const db = require("../data/dbConfig");
const jwt = require("../jwtConfig");

const router = express.Router();

//get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await db("notes")
      .join("users", "users.id", "notes.user_id")
      .select(
        "notes.id as id",
        "notes.title as title",
        "notes.content as content",
        "notes.user_id as user_id",
        "users.username as username"
      )
      .orderBy("id", "desc");
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get a note by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const note = await db("notes")
      .where({ id })
      .first();
    note
      ? res.status(200).json(note)
      : res.status(404).json({ message: "No note with that id" });
  } catch (e) {
    res.status(500).json(e);
  }
});

//get all notes by username
router.get("/user/:username", async (req, res) => {
  let { username } = req.params;

  try {
    username = username.toLowerCase();
    const user = await db("users")
      .where({ username })
      .first();
    if (user) {
      const notes = await db("notes").where({ user_id: user.id });
      const notesWithUsername = notes.map(note => {
        return { ...note, username };
      });
      res.status(200).json(notesWithUsername);
    } else {
      res.status(404).json({ message: "No such user" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

//post a new note
router.post("/", jwt.protected, async (req, res) => {
  const { title, content } = req.body;
  const userID = req.user.id;
  if (!title || !content) {
    res.status(422).json({ message: "Missing title or content for new note" });
  } else {
    try {
      let newNote = await db("notes")
        .insert({ title, content, user_id: userID })
        .returning("*");
      const refreshedNotes = await db("notes")
        .join("users", "users.id", "notes.user_id")
        .select(
          "notes.id as id",
          "notes.title as title",
          "notes.content as content",
          "notes.user_id as user_id",
          "users.username as username"
        )
        .orderBy("id", "desc");
      res.status(201).json(refreshedNotes);
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

//put a note update
router.put("/:id", jwt.protected, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const note = await db("notes")
      .where({ id })
      .first();

    if (parseInt(note.user_id, 10) !== parseInt(req.user.id, 10)) {
      res
        .status(401)
        .json({ message: "You're not authorized to update this note" });
    } else {
      if (!title || !content) {
        res
          .status(422)
          .json({ message: "Title or body is empty, both are required" });
      } else {
        const updated = await db("notes")
          .where({ id })
          .update({ title, content });
        const refreshedNotes = await db("notes")
          .join("users", "users.id", "notes.user_id")
          .select(
            "notes.id as id",
            "notes.title as title",
            "notes.content as content",
            "notes.user_id as user_id",
            "users.username as username"
          )
          .orderBy("id", "desc");
        updated
          ? res.status(200).json(refreshedNotes)
          : res.status(404).json({ message: "No note with that id" });
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

//delete a note by id
router.delete("/:id", jwt.protected, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await db('notes').where({ id }).first();

    if (parseInt(note.user_id, 10) !== parseInt(req.user.id, 10)) {
      res
        .status(401)
        .json({ message: "You're not authorized to delete this note" });
    } else {
      const deleted = await db("notes")
        .where({ id })
        .del();

      const refreshedNotes = await db("notes")
        .join("users", "users.id", "notes.user_id")
        .select(
          "notes.id as id",
          "notes.title as title",
          "notes.content as content",
          "notes.user_id as user_id",
          "users.username as username"
        )
        .orderBy("id", "desc");
      deleted
        ? res.status(200).json(refreshedNotes)
        : res.status(404).json({ message: "No note with that id" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
