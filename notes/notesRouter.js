const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/get/all", (req, res) => {
  db("notes")
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ message: "The notes information could not be retrieved." })
    );
});

router.get("/get/:id", (req, res) => {
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

module.exports = router;
