const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).json("list all notes");
});

route.get("/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json(`note ${id}`);
});

route.post("/", async (req, res) => {
  //new note
});

route.put("/:id", (req, res) => {
  // edit note
});

route.delete("/:id", (req, res) => {
  //delete note
});

module.exports = route;
