// ---- Node Dependencies ----
const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig");
const { authenticate, generateToken } = require("./authentication");

// ---- API Endpoints for Testing ----
module.exports = server => {
  server.get("/api/all", all);
  server.post("/api/create", create);
  sever.get("/api/view/:id", view);
  sever.put("/api/edit/:id", edit);
};

// ---- Retrieve ALL Notes. GET Endpoint ----
server.get("/api/all", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({
        Error: "Server timeout. Server can not retrieve notes at this time."
      });
    });
});

// ---- CREATE New Note. POST Endpoint ----
server.post("/api/create", (req, res) => {
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
});

// ---- VIEW Note by specific ID. GET Endpoint ----
server.get("/api/view/:id", (req, res) => {
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
});

// ---- EDIT Note by specific ID. PUT Endpoint ----
server.put("/api/edit/:id", (req, res) => {
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
});

// ---- DELETE Note by specific ID. DELETE Endpoint ----
server.delete("/api/delete/:id", (req, res) => {
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
});
