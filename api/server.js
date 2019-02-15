const express = require("express");

const notes = require("../notes/notesModel");
const tags = require("../notes/tagsModel");

const server = express();

server.use(express.json());

server.get("/notes", (req, res) => {
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

server.get("/notes/:id", (req, res) => {
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

server.get("/notes/:id/tags", (req, res) => {
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

server.get("/tags", (req, res) => {
  tags
    .fetch()
    .then(tags => {
      if (tags[0]) {
        res.json(tags);
      } else {
        res.status(404).json({ error: "thare are currently no tags in our directory" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "tags could not be retrieved." });
    });
});
server.get("/tags/:id", (req, res) => {
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

server.post("/notes", (req, res) => {
  const note = req.body;

  if (!note.title || typeof note.title !== "string" || note.title === "") {
    res.status(400).json({error: "title must be included and must be a string"})
  } else if (!note.content || typeof note.content !== "string" || note.content === "") {
    res.status(400).json({error: "content must be included and must be a string"})
  } else {
    notes
    .insert(note)
    .then(ids => {
      res.status(201).json({added: {...note, id: ids[0]}})
    })
    .catch(err => {
      res.status(500).json({error: "trouble adding note"})
    })
  }
})

server.post("/tags", (req, res) => {
  const tag = req.body;

  if(!tag.note_id || typeof tag.note_id !== "number") {
    res.status(400).json({error: "note_id must be included and must be a number"});
  } else {
    notes
    .fetch(tag.note_id)
    .then(notes => {
      if(notes[0]) {
        if(!tag.tag || typeof tag.tag !== "string" || tag.tag === "") {
          res.status(400).json({error: "tag must be included and mustt be a string"})
        } else {
          tags
          .insert(tag)
          .then(ids => {
            res.status(201).json({added: {...tag, id: ids[0]}})
          })
        }
      } else {
        res.status(404).json({error: "note_id does not match an existing note"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "trouble adding tag", error: err})
    })
  }
})

server.put("/notes/:id", (req, res) => {
  const newNote = req.body;
  const { id } = req.params;
  notes
    .fetch(id)
    .then(response => {
      if (response[0]) {
        if (!newNote.title || typeof newNote.title !== "string" || newNote.title === "") {
          res.status(400).json({ error: "title is required and must be a string" });
        } else if (!newNote.content || typeof newNote.content !== "string" || newNote.content === "") {
          res.status(400).json({ error: "content is required and must be a string" });
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
})

module.exports = server;
