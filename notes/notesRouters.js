const express = require("express");
const notesDb = require("./notesDataModel");
const router = express.Router();

router.get("/", (req, res) => {
  notesDb
    .findAll()
    .then(notes => {
      notes.forEach(note => {
        if (!note.tags) {
          note.tags = [];
        } else {
          let tagsArr = note.tags;

          console.log(tagsArr);
          note.tags = tagsArr.split(",");
        }
      });
      res.status(200).json(notes);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  notesDb
    .findById(id)
    .then(note => {
      if (!note.tags) {
        note.tags = [];
      } else {
        let tagsArr = note.tags;
        note.tags = tagsArr.split(",");
      }

      console.log(note);
      res.status(200).json(note);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const { title, textBody, tags } = req.body;
  notesDb
    .addNotes({ title, textBody, tags })
    .then(() => {
      notesDb
        .findAll()
        .then(notes => {
          notes.forEach(note => {
            if (!note.tags) {
              note.tags = [];
            } else {
              let tagsArr = note.tags;

              console.log(tagsArr);
              note.tags = tagsArr.split(",");
            }
          });
          res.json(notes);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

router.put("/:id", (req, res) => {
  const { title, textBody,tags } = req.body;
  const { id } = req.params;
  notesDb.editNote(id, { title, textBody, tags }).then(() => {
    notesDb.findAll().then(notes => {
      notes.forEach(note => {
        if (!note.tags) {
          note.tags = [];
        } else {
          let tagsArr = note.tags;

          console.log(tagsArr);
          note.tags = tagsArr.split(",");
        }
      });
      res.json(notes);
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  notesDb.deleteNote(id).then(() => {
    notesDb.findAll().then(notes => {
      notes.forEach(note => {
        if (!note.tags) {
          note.tags = [];
        } else {
          let tagsArr = note.tags;

          console.log(tagsArr);
          note.tags = tagsArr.split(",");
        }
      });
      res.json(notes);
    });
  });
});

module.exports = router;
