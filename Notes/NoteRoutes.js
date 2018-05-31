const express = require('express');
const NoteController = require('./NoteController');

const NoteRouter = express.Router();
const { getNotes, getNote, createNote, deleteNote } = NoteController;

NoteRouter.get('/', getNotes);
NoteRouter.get('/:id', getNote);
NoteRouter.post('/', createNote);
NoteRouter.delete('/', deleteNote);

module.exports = NoteRouter;