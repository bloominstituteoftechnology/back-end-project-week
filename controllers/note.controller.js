const mongoose = require('mongoose');
const Note = require('../models/Note');

const Notes = mongoose.model('Note');

exports.getNote = async(req, res) => {
  const note = await Notes.findOne({
    _id: req.params.id
  });
  console.log(note)
  res.send(note);
};

exports.getNotes = async(req, res) => {
  const notes = await Notes.find({ writtenBy: req.user.id });
  res.send(notes);
};

exports.writeNote = async(req, res) => {
  const { title, content } = req.body;

  const note = await new Note({
    writtenBy: req.user.id,
    title,
    content,
    createdAt: Date.now()
  }).save();

  res.send(note);
}

exports.updateNote = async(req, res) => {
  const { title, content } = req.body;

  const note = await Notes.findOneAndUpdate({
    writtenBy: req.user.id,
    _id: req.params.id,
  }, {
    $set: { title, content },
    lastUpdate: Date.now()
  }, { new: true }).exec();

  res.send(note);
};

exports.deleteNote = async (req, res) => {
  const note = await Notes.findByIdAndRemove({
    writtenBy: req.user.id,
    _id: req.params.id
  });

  res.send(note);
}

