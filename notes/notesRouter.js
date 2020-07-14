require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("../data/dbConfig");

const router = express.Router();

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token." });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided so no entry." });
  }
};

router.get("/get/all", protected, (req, res) => {
  db("notes")
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ message: "The notes information could not be retrieved." })
    );
});

router.get("/get/:id", protected, (req, res) => {
  db("notes")
    .where({ _id: req.params.id })
    .first()
    .then(user =>
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: "The note with the specified id doesn't exist." })
    )
    .catch(err =>
      res
        .status(500)
        .json({ message: "The note information could not be retrieved." })
    );
});

router.post("/create", protected, async (req, res) => {
  const { title, textBody } = req.body;
  if (title && textBody) {
    try {
      let id = await db("notes").insert(req.body);
      res.status(201).json(id[0]);
    } catch (err) {
      res.status(500).json({ message: "There was an error saving the note." });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide the title and textBody fields." });
  }
});

router.put("/edit/:id", protected, (req, res) => {
  db("notes")
    .where({ _id: req.params.id })
    .update(req.body)
    .then(count =>
      count
        ? db("notes")
            .where({ _id: req.params.id })
            .first()
            .then(user => res.status(200).json(user))
        : res
            .status(400)
            .json({ message: "The note with the specified id doesn't exist." })
    )
    .catch(err =>
      res.status(500).json({ message: "There was an error editing the note." })
    );
});

router.delete("/delete/:id", protected, (req, res) => {
  db("notes")
    .where({ _id: req.params.id })
    .del()
    .then(count =>
      count
        ? res.status(200).json(count)
        : res
            .status(400)
            .json({ message: "The note with the specified id doesn't exist." })
    )
    .catch(err =>
      res.status(500).json({ message: "There was an error deleting the note." })
    );
});

module.exports = router;
