const express = require("express");
const route = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
const sendErr = (res, stat = 500, message = "Server error") => {
  return res.status(stat).json({ error: message });
};

route.get("/", async (req, res) => {
  try {
    const notes = await db("notes");
    return res.status(200).json(notes);
  } catch (err) {
    return sendErr(res);
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await db("notes").where({ id });
    return res.status(200).json(note);
  } catch (err) {
    return sendErr(res);
  }
});

route.post("/", async (req, res) => {
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    return sendErr(res, 400, "must include title and text body");
  }
  if (title.length > 128 || textBody.length > 500) {
    return sendErr(res, 400, "Content too long.");
  }
  try {
    const [id] = await db("notes").insert({ ...req.body });
    const newNote = await db("notes")
      .where({ id })
      .first();
    return res.status(201).json(newNote);
  } catch (err) {
    if (err.errno === 19) {
      return sendErr(res, 400, "Note must have unique title");
    }
    return sendErr(res);
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    return sendErr(res, 400, "must include title and text body");
  }
  if (title.length > 128 || textBody.length > 500) {
    return sendErr(res, 400, "Content too long.");
  }
  try {
    const count = await db("notes")
      .where({ id })
      .update({ ...req.body });
    if (count) {
      const updatedNote = await db("notes").where({ id });
      return res.status(201).json(updatedNote);
    }
  } catch (err) {
    if (err.errno === 19) {
      return sendErr(res, 400, "Note must have unique title");
    }
    return sendErr(res);
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ids = await db("notes").select( 'id' ).map(x=>x.id);
    
    if (!ids.includes(parseInt(id))){
        return sendErr(res, 404, 'no note at given id')
    }
    const count = await db("notes")
      .where({ id })
      .del();
    if (count) {
      return res.status(200).json("Note deleted");
    }
  } catch (err) {
    return sendErr(res);
  }
});

module.exports = route;
