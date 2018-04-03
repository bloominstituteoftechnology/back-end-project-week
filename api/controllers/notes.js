const Note = require('../models/noteModel');

const createNote = async function(req, res) {
  const { author, title, body } = req.body;
  const note = new Note({ author, title, body });
  try {
    const savedNote = await note.save();
    res.json({ status: 'success', savedNote });
  }
  catch (err) {
    console.log(err);
    res.status(422).json({ status: err });
  };
};

const listNotes = async function(req, res) {
  const { uuid } = req.headers;
  if (!uuid) return res.status(422).json({ error: 'No uuid ID in headers!' });
  try {
    const allNotes = await Note.find({
      author: uuid,
    });
    res.json({ status: 'success', allNotes });
  } catch(err) {
    console.log(err);
    res.status(500).json({ status: err });
  };
};

module.exports = { 
  createNote,
  listNotes,
};
