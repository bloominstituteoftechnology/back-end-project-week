const express = require('express');
const notesDb = require('../../data/helpers/notesDb');
const { postCheck } = require('../../middleware/checks');

const router = express.Router();

router.post('/', postCheck, async (req, res, next) => {
    console.log(req.note);
    try {
        const notes = await notesDb.insert();
    } catch (err) {

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

module.exports = router;