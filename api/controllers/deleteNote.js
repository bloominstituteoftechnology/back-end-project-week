const Note = require('../models/noteModel');

const deleteNote = (req, res) => {
  const { _id } = req.body;
  // const tokenAuthor = req.decoded.id;
  // if(tokenAuthor === author.toString()) {
    Note.findByIdAndRemove(_id)
      .then(note => {
        if (note === null) {
          res.status(422).json({ message: 'Note by that Id was not found.'});
          return;
        }
        res.status(200).json(note);
      })
      .catch(err => {
        res.status(422).json({ message: 'Could not delete note', err });
      });
  // } 
  // else {
  //   res.sttus(422).json({ message: 'Wrong Author' })
  // }
};

module.exports = deleteNote;
