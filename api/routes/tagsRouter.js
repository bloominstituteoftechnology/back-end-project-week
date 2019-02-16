const notes = require("../../notes/notesModel");
const tags = require("../../notes/tagsModel");

const express = require("express");
const router = express.Router();

const { authenticate } = require("../../auth/authenticate");

const requestOptions = {
  headers: { accept: "application/json" }
};

router.get("/", (req, res) => {
  tags
    .fetch()
    .then(tags => {
      if (tags[0]) {
        res.json(tags);
      } else {
        res
          .status(404)
          .json({ error: "thare are currently no tags in our directory" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "tags could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  tags
    .fetch(id)
    .then(tag => {
      if (tag[0]) {
        res.json(tag[0]);
      } else {
        res.status(404).json({ error: "tag does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "tag could not be retrieved." });
    });
});

router.post("/:id", (req, res) => {
  const tag = req.body.newTag;
  const note_id = req.body.id;

  // if (!note_id || typeof note_id !== "number") {
  //   res
  //     .status(400)
  //     .json({ error: "note_id must be included and must be a number" });
  // } else {
  //   notes
  //     .fetch(note_id)
  //     .then(notes => {
  //       if (notes[0]) {
  //         if (!tag.tag || typeof tag.tag !== "string" || tag.tag === "") {
  //           res
  //             .status(400)
  //             .json({ error: "tag must be included and must be a string" });
  //         } else {
            tags.insert(tag, note_id).then(ids => {
              res.status(201).json({ added: { ...tag, note_id: note_id, id: ids[0] } });
            });
        //   }
        // } else {
        //   res
        //     .status(404)
        //     .json({ error: "note_id does not match an existing note" });
        // }
      })
      .catch(err => {
        res.status(500).json({ message: "trouble adding tag", error: err });
      });
  }
});

router.delete(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const deleted = await tags.fetch(id);

    tags
      .fetch(id)
      .then(tag => {
        if (tag[0]) {
          tags
            .remove(id)
            .then(rows => res.status(201).json(deleted))
            .catch(err =>
              res.status(500).json({ error: "trouble deleting tag" })
            );
        } else {
          res.status(404).json({ error: "tag does not exist" });
        }
      })
      .catch(err =>
        res.status(500).json({ error: "trouble retrieving tag to be deleted" })
      );
  }
);

module.exports = router;
