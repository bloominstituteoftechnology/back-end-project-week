const express = require("express");
const router = express.Router();

const { authenticate, makeToken } = require("../utilities/JWT");

const User = require("./userModel.js");

router
  .route("/")
  .post((req, res) => {
    const user = new User(req.body);
    console.log(req.body);
    user
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

router.route("/login").post(authenticate, (req, res) => {
  res.status(200).json({ success: true, user, token: makeToken(req.user) });
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

router.route("/name/:username").get((req, res) => {
  User.findOne({ username: req.params.username }).then(user => {
    res.json(user);
  });
});

module.exports = router;
