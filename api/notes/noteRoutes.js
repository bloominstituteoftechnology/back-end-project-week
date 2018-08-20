const express = require('express');
const notesDb = require('../../data/helpers/notesDb');
const { noteCheck } = require('../../middleware/checks');

const router = express.Router();

router.post('/', noteCheck, async (req, res, next) => {
    try {
        const notes = await notesDb.insert(req.note);
        res.status(201).json({ id: notes.id, ...req.note });
    } catch (err) {
        next({ code: 500, error: "There was an error while saving the note to the database." });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const notes = await notesDb.get();
        res.status(200).json(notes);
    } catch (err) {
        next({ code: 500, error: "Couldn't retrieve notes information." });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const note = await notesDb.get(req.params.id);
        if (!note) return next({ code: 404, message: "The note with the specified ID does not exist." });
        res.status(200).json(note);
    } catch (err) {
        next({ code: 500, error: "The note information could not be retrieved." });
    }
});

router.put('/:id', noteCheck, async (req, res, next) => {
    try {
        const note = await notesDb.update(req.params.id, req.note);
        if (!note) return next({ code: 404, message: "The note with the specified ID does not exist." });
        res.status(200).json({ id: note, ...req.note });
    } catch (err) {
        next({ code: 500, error: "The note information could not be modified." });
    }
});

module.exports = router;