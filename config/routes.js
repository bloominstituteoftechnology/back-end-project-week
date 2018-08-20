const db = require("../database/dbConfig");

module.exports = server => {
  server.get("/", root);
  server.get("/api/notes", get_notes);
};

const root = (req, res) => {
  res.status(200).json("Up and running");
};

const get_notes = (req, res) => {
  db("notes")
    .then(note => {
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
};
