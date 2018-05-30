import Note from './NoteModel';
import { userInfo } from 'os';

const NoteController = {
  getNotes: (req, res) => {
    Note
      .find()
      .then(response => {
        res.status(200).json({ notes: response });
      })
      .catch(err => {
        res.status(404).json({ error: 'Error fetching notes', err });
      });
  },
  createNote: (req, res) => {
    const noteInfo = req.body;

    if('title' in noteInfo && 'contents' in userInfo) {
      const newNote = new Note(noteInfo);
      newNote
        .save()
        .then(response => {
          res.status(201).json({ note: resposne });
        })
        .catch(err => {
          res.status(500).json({ error: 'Error created new note', err });
        });
    } else {
      res.status(500).json({ error: 'A note requires a title and contents' });
    }
  },
}

export default NoteController;