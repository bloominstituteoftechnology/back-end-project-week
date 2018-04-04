const Note = require('../models/NoteModel');
const User = require('../models/UserModel');

const newNote = (req, res) => {
  const { title, body } = req.body;   
  const note = new Note({title, body});   
  note     
    .save()     
    .then(savedNote => {       
      const id = savedNote._id;       
      User.findOneAndUpdate({ username: req.session.username }, { $push: { notes: id } })         
      .then(() => {           
        res.status(201).send(savedNote);         
      })         
      .catch(err => res.send(err));     
    })     
    .catch(err => res.send(err));
  };

module.exports = {
  newNote
};