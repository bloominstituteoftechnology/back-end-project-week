const express = require('express');
const Note = require('./noteSchema');

const noteRouter = express();

noteRouter.get('/', (req, res) => {
  const { userId } = req.decoded;
  Note.find()
    .where({ userId })
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ err: 'cannot get notes' });
    });
});

noteRouter.post('/', (req, res) => {
  const { title, text } = req.body;
  const { userId } = req.decoded;
  const note = new Note(req.body);
  note
    .save()
    .then(note => {
      Note.find({ userId })
        .then(notes => {
          res.status(200).json(notes);
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: err });
    });
});

noteRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Note.find({ _id: id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

noteRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { userId } = req.body.data.note;
  Note.find({ _id: id })
    .then(note => {
      if (note.length) {
        Note.find({ _id: id })
          .update(req.body.data.note)
          .then(note => {
            const { userId } = req.decoded;
            Note.find()
              .where({ userId })
              .then(notes => {
                res.status(200).json(notes);
              })
              .catch(err => {
                res.status(500).json({ err: 'cannot get notes' });
              });
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      } else {
        res.status(404).json({ msg: 'Note not found.' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

noteRouter.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  Note.findOne({ _id: id })
    .then(note => {
      if (note) {
        Note.findOne({ _id: id })
          .remove()
          .then(success => {
            const { userId } = req.decoded;
            Note.find()
              .where({ userId })
              .then(notes => {
                res.status(200).json(notes);
              })
              .catch(err => {
                res.status(500).json({ err: 'cannot get notes' });
              });
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      } else {
        res.status(404).json({ msg: 'Note not found.' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = noteRouter;
