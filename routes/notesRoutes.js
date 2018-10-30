const express = require('express');
const helper = require('../data/helper.js');
const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const notes = await helper.getNotes();
            res.status(200).json(notes);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        const note = req.body;
        try {
            const count = await helper.addNote(note);
            res.status(201).json({
                message: 'Note has been added.'
            });
        } catch (err) {
            next(err);
        }
    });

router
    .route('/:id')
    .get(async (req, res, next) => {
        const {
            id
        } = req.params;
        try {
            const note = await helper.getNote(id);
            note.length > 0 ? res.status(200).json(note) : next({
                statusCode: 404
            });
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        const {
            id
        } = req.params;
        const note = req.body;
        try {
            const count = await helper.updateNote(id, note);
            count > 0 ?
                res.status(200).json({
                    message: 'Note was updated.'
                }) :
                next({
                    statusCode: 404
                });
        } catch (err) {
            next(err);
        }
    })

    .delete(async (req, res, next) => {
        const {
            id
        } = req.params;
        try {
            const count = await helper.deleteNote(id);
            count > 0 ?
                res.status(200).json({
                    message: 'Note was deleted.'
                }) :
                next({
                    statusCode: 404
                });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;