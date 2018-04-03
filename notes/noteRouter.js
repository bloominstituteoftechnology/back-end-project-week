const express = require('express');
const Note = require('./noteModel.js');
const noteRouter = express.Router();

noteRouter.post('/', (req, res) => {
  const info = req.body;
  const note = new Note(info);

  note
    .save()
    .then(savedNote => {
      res
        .status(200)
        .json(savedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ MESSAGE: 'Note saving error', error: err });
    });
});

noteRouter.delete('/', (req, res) => {
  const { id } = req.body;

  Note
    .findByIdAndRemove(id)
    .then(note => {
      res
        .status(200)
        .json({ message: "Note deleted successfully!" })
    })
    .catch(err => {
      res
        .status(500)
        .json(err)
    })
})

// .delete( function (req, res) {     // <===== defined inside 'put',
//     User.remove({
//         _id: req.params.user_id
//     }, function (err, user) {
//         if (err) return res.send(err);
//         res.json({ message: 'Deleted' });
//     });
// });

module.exports = noteRouter;
