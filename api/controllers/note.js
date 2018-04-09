const Note = require('../models/noteModels');

const createNote = (req, res) => {
  const {title, message} = req.body;

  const note = new Note({title, message});
  note.save((err, savedNote) => {
    if (err) return res.send(err);
    res.json({
      success: 'Note saved',
      note: savedNote
    });
  });
};

const viewNote = (req, res) => {
  const id = req.params.id;
  Note.findById(id, (err, aNote) => {
    if (err) return res.send(err);
    res.json(aNote);
  })
};

const updateNote = (req, res) => {
  const id = req.params.id;
  const {title, message} = req.body;

  Note.findByIdAndUpdate(id, {title, message}, {new: true}, (err, updatedNote) => {
    if (err) return res.send(err);
    res.json({
      success: 'Note updated',
      note: updatedNote
    });
  });
};

const deleteNote = (req, res) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id, (err, removedNote) => {
    if (err) return res.send(err);
    res.json({
      success: 'Note removed',
      note: removedNote
    });
  })

};

const getNotes = (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.json(500, {
        error: err
      });
    }

    res.json(200, notes);
  })
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  viewNote
};
