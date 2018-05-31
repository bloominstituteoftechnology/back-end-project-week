const express = require('express');
const NoteController = require('./NoteController');

const NoteRouter = express.Router();
const { getNotes, getNote, createNote } = NoteController;

NoteRouter.get('/', getNotes);
NoteRouter.get('/:id', getNote);
NoteRouter.post('/', createNote);

module.exports = NoteRouter;