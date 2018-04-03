const Note = require("../models/Note");
const User = require("../models/User");

const touchNote = (req, res) => {
  const { title, text } = req.body;
  const { email } = req.decoded;
  User.findOne({ email })
    .then(user => {
      const userId = user.id;
      const note = new Note({ title, text, userId });
      note.save((err, note) => {
        if (err) return res.send(err);
        res.send(note);
      });
    })
    .catch(err => {
      res.status(500).json({ error: `Unable to get user: ${err}` });
    });
};

const popNotes = (req, res) => {
  const { email } = req.decoded;
  User.findOne({ email })
    .then(user => {
      const userId = user.id;
      Note.find({ userId }, (err, notes) => {
        if (err) return res.send(err);
        res.send(notes);
      });
    })
    .catch(err => {
      res.status(500).json({ error: `Could not get users: ${err}` });
    });
};

const popNotesById = (req, res) => {
  const { id } = req.params;
  Note.findById(id)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: "Could not find that note by ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Note unable to be received" });
    });
};

const updateNote = (req, res) => {
  const { id } = req.params;
  Note.findByIdAndUpdate(id, req.body)
    .then(updatedNote => {
      if (updatedNote) {
        res.status(200).json(updatedNote);
      } else {
        res.status(404).json({ message: "Unable to find that note by ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `Error updating note ${err}` });
    });
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then(removedNote => {
      if (removedNote) {
        res.status(200).json(removedNote);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a note with that ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `Could not delete the note ${err}` });
    });
};

module.exports = {
  touchNote,
  popNotesById,
  popNotesById,
  updateNote,
  deleteNote
};
