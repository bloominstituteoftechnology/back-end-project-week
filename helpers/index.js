require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");
const knexfile = require("../knexfile");
const knex = require("knex")(knexfile.development);
const date = knex.fn.now();

const generateToken = user => {
  const payload = {
    username: user.username,
    id: user.id
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
};

module.exports = {
  login: (req, res) => {
    const creds = req.body;

    db("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: "welcome!", token });
        } else {
          res.status(401).json({ message: "you shall not pass!!" });
        }
      })
      .catch(err => res.json(err));
  },

  register: (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 6);
    creds.password = hash;
    db("users")
      .insert(creds)
      .returning("id")
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        console.error(error);
        json(err);
      });
  },
  getNotes: (req, res) => {
    db("notes")
      .where("user_id", req.decodedToken.id)
      .then(notes => {
        res.json(notes);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Retrieving notes failed." });
      });
  },
  getNote: (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({ id })
      .first()
      .then(note => {
        if (!note) {
          res.status(404).json({
            message: `Cannot find note with id ${id}.`
          });
        } else if (note.user_id !== req.decodedToken.id) {
          res.status(403).json({
            message: "You do not have permission to access that note."
          });
        } else res.status(200).json(note);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          message: "Retrieving note failed."
        });
      });
  },
  addNote: (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(422).json("Please provide a title and content.");
      return;
    }
    const newNote = { title, content };
    db("notes")
      .insert({ ...newNote, user_id: req.decodedToken.id })
      .returning("id")
      .then(ids =>
        db("notes")
          .where("id", ids[0])
          .first()
          .then(note =>
            res
              .status(201)
              .json({ message: "Successfully added note.", note: note })
          )
      )
      .catch(err => {
        console.error(err);
        res.status(500).json({
          message: "Adding note failed."
        });
      });
  },
  editNote: (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({ id })
      .first()
      .then(note => {
        if (!note) {
          res.status(404).json({
            message: `Cannot find note with id ${id}.`
          });
        } else if (note.user_id !== req.decodedToken.id) {
          res.status(403).json({
            message: "You do not have permission to access that note."
          });
          return;
        } else {
          const { title, content } = req.body;
          if (!title && !content) {
            res.status(422).json("Please provide a title or content.");
            return;
          }
          const editedNote = { title, content, modified: date };
          db("notes")
            .where({ id })
            .update(editedNote)
            .returning("id")
            .then(() =>
              db("notes")
                .where({ id })
                .first()
                .then(note =>
                  res.status(200).json({
                    message: "Successfully edited note.",
                    note: note
                  })
                )
            )
            .catch(err => {
              console.error(err);
              res.status(500).json({
                message: "Editing note failed."
              });
            });
        }
      });
  },
  deleteNote: (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({ id })
      .first()
      .then(note => {
        if (!note) {
          res.status(404).json({
            message: `Cannot find note with id ${id}.`
          });
        } else if (note.user_id !== req.decodedToken.id) {
          res.status(403).json({
            message: "You do not have permission to access that note."
          });
          return;
        } else {
          db("notes")
            .where({ id })
            .del()
            .then(() =>
              res.status(200).json({ message: "Successfully deleted note." })
            )
            .catch(err => {
              console.error(err);
              res.status(500).json({
                message: "Deleting note failed."
              });
            });
        }
      });
  }
};
