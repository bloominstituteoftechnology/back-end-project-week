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
    const {title, textBody} = req.body;
    if (!title || !textBody){
        return sendErr(res, 404, 'must include title and text body')
    }
    try {
        const id = await db('notes').insert({... req.body})
        const newNote = await db('notes').where({id})
        return res.status(201).json(newNote)
    }catch (err){
        return sendErr(res)
    }
});

route.put("/:id", (req, res) => {
  // edit note
});

route.delete("/:id", (req, res) => {
  //delete note
});

module.exports = route;
