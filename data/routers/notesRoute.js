const express = require('express');
const db = require('../knexConfig');
const router = express.Router();

class ServerError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
router.get('/', async (req, res, next) => {
    try {
        const notes = await db('notes');
        res.status(200).json(notes)
    }
    catch (err) {
        next(err)
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const note = await db('notes').where('id', id);
        if (!note.length) { throw new ServerError(500, 'Note could not be found with that id'); }
        else { res.status(200).json(note) }
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const note = req.body;

    try {
        if (!note.title || !note.content) { throw new ServerError(501, 'Please fill out title and content') }
        else {
            const response = await db('notes').insert(note);
            res.status(200).json(response);
        }
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const note = await db('notes').where('id', id).del();
        if (!note) { throw new ServerError(502, 'Note could not be found'); }
        else { res.status(200).send(`${note} removed!`); }
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const newNote = req.body;

    try {
        if (!newNote.title || !newNote.content) { throw new ServerError(501, 'Please fill out title and content') }
        const response = await db('notes').where('id', id).update(newNote);

        if (!response) { throw new ServerError(501, 'Note could not be found') }
        else { res.status(200).send(`${response} updated!`) }
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;
