const express = require("express");
const router = express.Router();

const User = require("./userModel");

router.get("/", (req, res) => {
  let query = User.find();

  query
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/register", (req, res) => {
  const newUser = req.body;
  const user = new User(newUser);

  user
    .save()
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      if (user.name === undefined) {
        res.status(400).json({ errorMsg: "Please provide a name." });
      } else {
        res.status(500).json(err);
      }
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Cannot find user" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const userEdited = req.body;

  User.findByIdAndUpdate(id, userEdited)
    .then(response => {
      if (response === null) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(400).json({
          errorMsg: "invalid ID, check and try again."
        });
      } else {
        res.status(500).json(err);
      }
    });
});

module.exports = router;
