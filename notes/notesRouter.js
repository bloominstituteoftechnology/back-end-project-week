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

router.get("/:note", (req, res) => {
  const noteId = req.params.note;
  Note.findById(noteId)
    .then(note => {
      if (!note) res.status(404).json("Note not found");
      else if (!(req.session._id == note.user_id))
        res.status(422).json("You are not authorized to view this note");
      else res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.put("/:note", (req, res) => {
  const noteId = req.params.note;
  Note.findById(noteId)
    .then(found => {
      if (!found) {
        res.status(404).json("Note not found");
      } else if (!(req.session._id == found.user_id)) {
        res.status(422).json("You are not authorized");
      } else {
        if (!req.body.title.length || !req.body.content.length) {
          res.status(422).json("Title and content can't be empty");
        } else {
          found
            .update({ ...req.body })
            .then(note => {
              res.status(200).json(note);
              console.log("Update successful");
            })
            .catch(error => {
              res.status(500).json(error.message);
            });
        }
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.delete("/:note", (req, res) => {
  const noteId = req.params.note;
  Note.findById(noteId)
    .then(found => {
      if (!found) {
        res.status(404).json("Note not found");
      } else if (!(req.session._id == found.user_id)) {
        res.status(422).json("You are not authorized");
      } else {
        found
          .remove()
          .then(removed => {
            res
              .status(200)
              .json({ message: `Note with ${noteId} has been removed` });
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
