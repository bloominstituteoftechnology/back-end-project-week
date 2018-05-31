const Note = require('./NoteModel');

const NoteController = {
  getNotes: (req, res) => {
    Note
      .find()
      .then(response => {
        res.status(200).json({ notes: response });
      })
      .catch(err => {
        res.status(404).json({ error: 'Error fetching notes', err });
      });
  },
  getNote: (req, res) => {
    const { id } = req.params;
    Note
      .findById(id)
      .then(response => {
        res.status(200).json({ note: response })
      })
      .catch(err => {
        res.status(404).json({ error: 'Error fetching note', err });
      });
  },
  createNote: (req, res) => {
    const noteInfo = req.body;

    if('title' in noteInfo && 'contents' in noteInfo) {
      const newNote = new Note(noteInfo);
      newNote
        .save()
        .then(response => {
          res.status(201).json({ note: response });
        })
        .catch(err => {
          res.status(500).json({ error: 'Error created new note', err });
        });
    } else {
      res.status(500).json({ error: 'A note requires a title and contents' });
    }
  },
}

module.exports = NoteController;