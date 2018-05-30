const express = require('express');
const noteController = require('./noteController');

const noteRouter = express.router();
const {
  getNotes,
  createNotes,
  viewNote,
  editNote,
  deleteNote
} = noteController;

noteRouter.get('/', getNotes); // get list of notes

noteRouter.post('/', createNotes); // create a new note with title and content

noteRouter.get('/:id', viewNote); // view existing note // findbyid

noteRouter.put('/:id', editNote); // edit existing note

noteRouter.delete('/:id', deleteNote); // delete existing note

export default noteRouter;
