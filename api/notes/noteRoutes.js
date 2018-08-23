const express = require('express');
const usersDb = require('../../data/helpers/usersDb');
const notesDb = require('../../data/helpers/notesDb');
const tagsDb = require('../../data/helpers/tagsDb');
const { noteCheck, loginCheck } = require('../../middleware/checks');

const router = express.Router();

router.use(loginCheck);

router.post('/', noteCheck, async (req, res, next) => {
    try {
        const notes = await notesDb.insert(req.note);
        const user = await usersDb.get(req.note.user_id);
        const updatedOrder = JSON.parse(user.note_order);
        updatedOrder.push(notes.id);
        const order = await usersDb.update(req.note.user_id, { note_order: JSON.stringify(updatedOrder) });
        if (!order) return next({ code: 404, message: "The user with the specified ID does not exist." });
        res.status(201).json({ id: notes.id, ...req.note, tags: [] });
    } catch (err) {
        next({ code: 500, error: "There was an error while saving the note to the database." });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const notes = await notesDb.get(req.jwtToken.userId);
        const user = await usersDb.get(req.jwtToken.userId);
        const order = JSON.parse(user.note_order).map(o => notes.find(note => note.id === o));
        res.status(200).json(order);
    } catch (err) {
        next({ code: 500, error: "Couldn't retrieve notes information." });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const note = await notesDb.get(req.jwtToken.userId, req.params.id);
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
        const user = await usersDb.get(req.jwtToken.userId);
        const updatedOrder = JSON.parse(user.note_order).filter(o => o != req.params.id);
        const order = await usersDb.update(req.jwtToken.userId, { note_order: JSON.stringify(updatedOrder) });
        if (!order) return next({ code: 404, message: "The user with the specified ID does not exist." });
        res.status(200).json(note);
    } catch (err) {
        next({ code: 500, error: "The note could not be removed" });
    }
});

module.exports = router;