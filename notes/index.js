const express = require('express');
const router = express.Router();
const db = require('../data/helpers/index');
const tagDb = require('../data/helpers/tagDb');
// const { notes, tags, noteTags } = require('../data/testData');

router.get('/', async (req, res) => {
    try {
        let notes = await db.get();
        notes.map(note => note.tags = note.tags.split(','));

        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err)
    }
}).get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await db.get(id);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
}).post('/', async (req, res) => {
    try {
        const noteBody = {
            title: req.body.title,
            content: req.body.content
        };
        const tagBody = {
            tags: req.body.tags
        };

        res.status(200).json(noteBody);

        // const newNote = { ...req.body };
        const note = await db.add(noteBody);

        res.status(200).json(noteBody);
    } catch (err) {
        res.status(500).json(err);
    }
}).put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const noteBody = {
            title: req.body.title,
            content: req.body.content
        };
        const tagBody = {
            tags: req.body.tags
        };

        const note = await db.edit(id, noteBody, tagBody);

        const newNote = await db.get(id);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
}).delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const droppedNote = await db.get(id);
        const note = await db.drop(id);
        res.status(200).json(droppedNote);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
