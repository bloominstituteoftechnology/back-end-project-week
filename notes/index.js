const express = require('express');
const router = express.Router();
const db = require('../data/helpers/index');
// const { notes, tags, noteTags } = require('../data/testData');

router.get('/', async (req, res) => {
    try {
        const notes = await db.get();

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
        const newNote = { ...req.body };
        const note = await db.add(newNote);

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
}).put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newNote = { ...req.body };
        const edit = await db.edit(id, newNote);
        const note = await db.get(id);

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
}).delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // const note = await db.get(id);
        const drop = await db.drop(id);

        res.status(200).json(`Note ${id} deleted`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
