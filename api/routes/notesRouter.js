const notes = require("../../notes/notesModel");
const tags = require("../../notes/tagsModel");

const express = require("express");
const router = express.Router();

const { authenticate } = require("../../auth/authenticate");

// const requestOptions = {
//   headers: { accept: "application/json" }
// };

router.get("/", (req, res) => {
  notes
    .fetch()
    .then(notes => {
      notes[0]
        ? res.json(notes)
        : res
            .status(400)
            .json({ error: "there are currently no notes in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve notes" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  notes
    .fetch(id)
    .then(note => {
      if (note[0]) {
        res.json(note);
      } else {
        res.status(404).json({ error: "note does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "note could not be retrieved." });
    });
});

router.get("/:id/tags", (req, res) => {
  const { id } = req.params;

  notes
    .fetch(id)
    .then(note => {
      if (note[0]) {
        tags.fetchTagsByNote(note[0].id).then(tags => {
          if (tags[0]) {
            res.json(tags);
          } else {
            res.status(404).json({ error: "note has no tags" });
          }
        });
      } else {
        res.status(404).json({ error: "note does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "note tags could not be retrieved." });
    });
});

router.post("/", authenticate, (req, res) => {
  const note = req.body;

  if (!note.title || typeof note.title !== "string" || note.title === "") {
    res
      .status(400)
      .json({ error: "title must be included and must be a string" });
  } else if (
    !note.content ||
    typeof note.content !== "string" ||
    note.content === ""
  ) {
    res
      .status(400)
      .json({ error: "content must be included and must be a string" });
  } else {
    notes
      .insert(note)
      .then(ids => {
        res.status(201).json({ added: { ...note, id: ids[0] } });
      })
      .catch(err => {
        res.status(500).json({ error: "trouble adding note" });
      });
  }
});

router.put("/:id", authenticate, (req, res) => {
  const newNote = req.body;
  const { id } = req.params;
  notes
    .fetch(id)
    .then(response => {
      if (response[0]) {
        if (
          !newNote.title ||
          typeof newNote.title !== "string" ||
          newNote.title === ""
        ) {
          res
            .status(400)
            .json({ error: "title is required and must be a string" });
        } else if (
          !newNote.content ||
          typeof newNote.content !== "string" ||
          newNote.content === ""
        ) {
          res
            .status(400)
            .json({ error: "content is required and must be a string" });
        } else {
          notes
            .update(id, newNote)
            .then(rows => {
              notes
                .fetch(id)
                .then(resp => res.status(201).json(resp))
                .catch(err =>
                  res
                    .status(500)
                    .json({ error: "trouble retrieving updated note" })
                );
            })
            .catch(err =>
              res.status(500).json({ error: "trouble updating note" })
            );
        }
      } else {
        res.status(404).json({ error: "note does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving note to update" })
    );
});

router.delete(
  "/:id", authenticate,
  async (req, res) => {
    const { id } = req.params;
    const deleted = await notes.fetch(id);

    notes
      .fetch(id)
      .then(note => {
        if (note[0]) {
          notes
            .remove(id)
            .then(rows => res.status(201).json(deleted))
            .catch(err =>
              res.status(500).json({ error: "trouble deleting note" })
            );
        } else {
          res.status(404).json({ error: "note does not exist" });
        }
      })
      .catch(err =>
        res.status(500).json({ error: "trouble retrieving note to be deleted" })
      );
  }
);

module.exports = router;
