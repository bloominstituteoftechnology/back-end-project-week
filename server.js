const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Note = require("./models/Note");

const loginInfo = require("./loginInfo");

mongoose
  .connect(
    `mongodb://${loginInfo.username}:${
      loginInfo.password
    }@ds033175.mlab.com:33175/lambda-notes`
  )
  .then(() => console.log("\n... API Connected to Database ...\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n", err));

const port = process.env.PORT || 3333;

const server = express();

server.use(express.json());
server.use(cors({}));

server.get("/", (req, res) => {
  res.json({ Message: "Hello World" });
});

server.get("/notes", (req, res) => {
  Note.find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get notes." });
    });
});

server.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a note for that id." });
    });
});

server.post("/notes", (req, res) => {
  const newNote = new Note(req.body);
  newNote
    .save()
    .then(note => {
      res.status(201).json(note);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not post note." });
    });
});

server.put("/notes/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const options = {
    new: true
  };
  if (!changes.title && !changes.content) {
    return res
      .status(422)
      .json({ errorMessage: "Please add a title and/or content field." });
  }
  Note.findById(id)
    .then(note => {
      Note.findByIdAndUpdate(id, changes, options)
        .then(note => {
          if (!note) {
            return res
              .status(404)
              .json({ errorMessage: "No note with that id could be found." });
          } else res.status(200).json(note);
        })
        .catch(err => {
          res
            .status(500)
            .json({ errorMessage: "Could not update a note with that id." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a note for that id." });
    });
});

server.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then(note => {
      Note.findByIdAndRemove(id)
        .then(note => {
          if (!note) {
            return res
              .status(404)
              .json({ errorMessage: "No note with that id could be found." });
          } else res.status(200).json(note);
        })
        .catch(err => {
          res
            .status(500)
            .json({ errorMessage: "Could not delete a note with that id." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: "Could not get a note for that id." });
    });
});

server.listen(port, err => {
  if (err) console.log(err);
  else {
    console.log(`Magic happening on ${port}`);
  }
});
