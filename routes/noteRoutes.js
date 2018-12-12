const express = require("express");
const route = express.Router();
const noteHelp = require("../data/helpers/noteHelpers.js");
const db = require("../data/dbConfig.js");
const {authenticate} = require('../middlewares/custom-middlewares.js')

// Endpoint for getting entire array of notes
route.get("/", authenticate, (req, res) => {
  noteHelp
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: `There was an error: ${err}` });
    });
});

// Endpoint for getting single note
route.get("/:id", authenticate, (req, res) => {
  const { id } = req.params;
  noteHelp
    .get(id)
    .then(note => {
      if (!note) {
        res.status(404).json({ message: `Note with id ${id} does not exist.` });
      }
      if (note) {
        db("tags as t")
        .where('t.notes_id', id)
        .then(tags => {
          note.tags = tags;
          res.status(200).json(note);
        });
      } else {
          res.status(404).json({ message: "note not found" });
        }
    res.status(200).json(note)
    })
    .catch(err => res.status(500).json({ message: `Error: ${err}` }));
});


//Endpoint for adding a note

route.post("/", (req, res) => {
const { title, textBody } = req.body;
if (!title || !textBody) {
res
  .status(400)
  .json({ Error: `Please provide title and textBody to add a new note.` });
}
noteHelp
.create({ title, textBody })
.then(ids => {
  res
    .status(200)
    .json(ids);
})
.catch(err => res.status(500).json({ message: `Error: ${err}` }));
});

// Endpoint for updating a note

route.put('/:id', async (req, res) => {
const {id} = req.params
const {title, textBody} = req.body



noteHelp.update(id, {title, textBody})
.then(async success => {
    const copyOfNotesDB = await db('notes').where('id', id).first()
    if(success === 0) {
        res.status(404).json({message: `Note with id of ${id} does not exist.`})
    }
    res.status(200).json(copyOfNotesDB)
})
.catch(err => res.status(500).json({message: `Error: ${err}`}))
})


// Endpoint for deleting a note

route.delete('/:id', (req, res) => {
    const {id} = req.params
    noteHelp.remove(id)
    .then(success => {
        if(success === 0) {
            res.status(404).json({message: `Note with id of ${id} does not exist.`})
        }
        res.status(200).json({message: `Success! Note deleted.`})
    })
    .catch(err => res.status(500).json({message: `Error: ${err}`}))
})
module.exports = route;
