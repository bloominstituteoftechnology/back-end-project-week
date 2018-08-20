const db = require('../data/helpers/noteDb');
const express = require('express');

const router = express.Router();

const sendError = (code, message, error) => {
    return {
        code,
        message,
        error
    }
}

router.get('/', async (req, res, next) => {
    try {
        const response = await db.get();
        res.status(200).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to retrieve notes.', error.message))
    }
})

router.get('/:id(\\d+)', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await db.get(id);
        res.status(200).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to retrieve notes.', error.message))
    }
})

router.post('/', async (req, res, next) => {
    if (!(req.body.title && req.body.content)) {
        return next(sendError(400, "Failed to save note to database.", "Please provide both title and content."))
    }

    try {
        const response = await db.add(req.body);
        res.status(200).json({
            id: response,
            ...req.body
        });
    } catch (error) {
        next(sendError(500, 'Failed to save note to database.', error.message))
    }
})

router.put('/:id', async (req, res, next) => {
    if (!req.body.title && !req.body.content) {
        return next(sendError(400, "Failed to update note.", "Please provide title or content to be updated."))
    }

    const id = req.params.id;
    const newNote = {};
    if (req.body.title) newNote.title = req.body.title;
    if (req.body.content) newNote.content = req.body.content;

    try {
        const response = await db.update(id, newNote);
        const updated = await db.get(id);
        res.status(200).json(updated);
    } catch (error) {
        next(sendError(500, 'Failed to save note to database.', error.message))
    }
})

module.exports = router;