const express = require('express');
const notesDb = require('../../data/helpers/notesDb');
const tagsDb = require('../../data/helpers/tagsDb');
const { noteCheck } = require('../../middleware/checks');

const router = express.Router();

router.post('/', noteCheck, async (req, res, next) => {
    try {
        const notes = await notesDb.insert(req.note);
        res.status(201).json({ id: notes.id, ...req.note, tags: [] });
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
        if (req.tagId) {
            await tagsDb.remove(req.tagId);
        }
        if (req.tag) {
            await tagsDb.insert(req.params.id, req.tag);
            req.tags.push({ ...req.tag });
        }
        const note = await notesDb.update(req.params.id, req.note);
        if (!note) return next({ code: 404, message: "The note with the specified ID does not exist." });
        res.status(200).json({ id: Number(req.params.id), ...req.note, tags: req.tags });
    } catch (err) {
        next({ code: 500, error: "The note information could not be modified." });
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const note = await notesDb.remove(req.params.id);
        if (!note) return next({ code: 404, message: "The note with the specified ID does not exist." });
        res.status(200).json(note);
    } catch (err) {
        next({ code: 500, error: "The note could not be removed" });
    }
});

module.exports = router;