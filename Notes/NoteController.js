import Note from './NoteModel';
import { userInfo } from 'os';

const NoteController = {
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
          res.status(500).json({ err: 'Error created new note', err });
        });
    } else {
      res.status(500).json({ err: 'A note requires a title and contents' });
    }
  }
}

export default NoteController;