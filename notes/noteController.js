const note = require('./noteModel');

const noteController = {
  getNotes: (req, res) => {
    note
      .find()
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).josn({ errorMessage: 'Unable to populate notes' });
      });
  },
  createNotes: (req, res) => {
    const note = new note(req.body);
    note
      .save()
      .then(newNote => {
        res.status(201).json(newNote);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'Unable to add note' });
      });
  }
};

// viewNote
// editNote
// deleteNote
