const Note = require('../models/noteModel');

const createNote = async function(req, res) {
  const { title, body } = req.body;
  const note = new Note({ title, body });
  try {
    const savedNote = await note.save();
    res.json({ status: 'success', savedNote });
  }
  catch (err) {
    console.log(err);
    res.json({ status: err });
  };
};

module.exports = { createNote };
