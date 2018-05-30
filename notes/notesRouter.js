const router = require("express").Router();
const User = require("../users/User.js");
const Note = require("./Note.js");

router.get("/", (req, res) => {
  User.findById(req.session._id)
    .populate("notes")
    .then(user => {
      if (!user) res.status(404).json("user not found!");
      else res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json("something bad happened");
    });
});

router.post("/", (req, res) => {
  if (!(req.body.title && req.body.content)) {
    res.status(422).json("Title and text body are mandatory");
  }

  User.findById(req.session._id)
    .then(user => {
      if (!user) {
        res.status(404).json("user not found!");
      } else {
        const newNote = new Note({ ...req.body, user_id: req.session._id });
        newNote
          .save()
          .then(saved => {
            user.addNote(saved._id);
            user.save();
            res.status(201).json(saved);
          })
          .catch(error => {
            res.status(500).json(error.message);
          });
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
