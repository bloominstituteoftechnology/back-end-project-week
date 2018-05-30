const express = require('express');
const NoteController = require('./NoteController');

const NoteRouter = express.Router();
const { createNote } = NoteController;

NoteRouter.post('/', createNote);

export default NoteRouter;