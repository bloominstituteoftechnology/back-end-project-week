const express = require('express');
const NoteController = require('./NoteController');

const NoteRouter = express.Router();
const { getNotes, createNote } = NoteController;

NoteRouter.get('/', getNotes);
NoteRouter.post('/', createNote);

export default NoteRouter;