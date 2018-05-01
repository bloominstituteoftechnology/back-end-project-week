const express = require("express");
const router = express.Router();

const User = require("./userModel.js");

router
  .route("/")
  .post((req, res) => {
    const user = new User(req.body);
    note
      .save()
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .get((req, res) => {
    User.find().then(users => {
      res.json(users);
    });
  });

router
  .route("/:id")
  .put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
      updatedUser => res.json(updatedUser)
    );
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.id).then(deletedUser => {
      res.json(deletedUser);
    });
  });

module.exports = router;
