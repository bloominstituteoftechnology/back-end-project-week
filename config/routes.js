// ---- Node Dependencies ----
const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig");
// const { authenticate, generateToken } = require("./authentication");

// ---- API Endpoints for Note Testing ----
module.exports = server => {
  server.get("/api/all", all);
  server.post("/api/create", create);
  server.get("/api/view/:id", view);
  server.put("/api/edit/:id", edit);
  server.delete("/api/delete/:id", remove);
};

// ---- Retrieve ALL Notes. GET Endpoint ----
function all(req, res) {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({
        Error: "Server timeout. Server can not retrieve notes at this time."
      });
    });
}

// ---- CREATE New Note. POST Endpoint ----
function create(req, res) {
  const newNote = req.body;

  db.insert(newNote)
    .into("notes")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res
        .status(500)
        .json({ Error: "Server timeout. Note can not be created." });
    });
}

// ---- VIEW Note by specific ID. GET Endpoint ----
function view(req, res) {
  const id = req.params.id;
  db("notes")
    .select()
    .where({ id })
    .then(note => {
      res.status(201).json(note);
    })
    .catch(err => {
      res.status(500).json({
        Error: "Server timeout. A note with that ID can not be found."
      });
    });
}

// ---- EDIT Note by specific ID. PUT Endpoint ----
function edit(req, res) {
  const changes = req.body;
  const { id } = req.params;

  db("notes")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ Error: "Failed to update. No edits to be found." });
      } else {
        res.status(201).json(count);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ Error: "Server timeout. Edits could not be applied." });
    });
}

// ---- DELETE Note by specific ID. DELETE Endpoint ----
function remove(req, res) {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({
        Error: "Server timeout. Note can not be deleted at this time."
      });
    });
}
