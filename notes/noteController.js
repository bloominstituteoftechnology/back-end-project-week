const router = require('express').Router();
const Note = require('./noteModel.js');

router
  .route('/')
  .get((req, res) => {
    
    Note.find({})
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(error => {
        res.status(500).json(console.error('Error retrieving notes', error));
      });
  })  
  .post((req, res) => {
    const note = new Note(req.body);
    
    note
      .save()
      .then(savedNote => {
        res.status(201).json({ success: 'Note has been created.', creation: savedNote });
      })
      .catch(error => res.status(500).json(console.error('Error creating note', error)));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    
    Note.find({})
    .then(notes => {
      let note = notes[`${id}`];
      !note
      ? res.status(404).json({ error: 'Note not found.' })
      : res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json(console.error('Error retrieving note!', error));
    })
  })
  
  .delete((req, res) => {
    const { id } = req.params;
    
    Note.find({})
    .then(notes => {
      let note = notes[`${id}`];
      if (!note) res.status(404).json({ error: 'Note not found.' });
      else {
        note.remove()
        .then(deletedNote => {
          res.status(200).json({ success: 'Note has been deleted.', deletion: deletedNote });
        });
      }
    })
    .catch(error => {
      res.status(500).json(console.error('Error deleting note!', error));
    });
  })

  .put((req, res) => {
    const { id } = req.params;
    let newNote = req.body;
    newNote.edited = new Date();

    Note.find({})
    .then(notes => {
      let oldNote = notes[`${id}`];
      if (!oldNote) res.status(404).json({ error: 'Note not found.' });
      else {
        console.log(oldNote);
        oldNote
          .set({ title: newNote.title, body: newNote.body, author: newNote.author, edited: newNote.edited })
          .save()
          .then(() => {
            res.status(200).json({ success: 'Note has been updated.', changes: { ...newNote } });
          })
          .catch(error => {
            res.status(500).json(console.error('Error updating note!', error));
          })
      }
    })
    .catch(error => {
      res.status(500).json(console.error('Error updating note!', error));
    });
  });


module.exports = router;
