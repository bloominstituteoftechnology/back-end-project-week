const express = require('express');
const noteModel = require('../data/models/noteModel');
const router = express.Router();

router.post('/', async (req, res) => {
    const note = req.body;
    if (note.title && note.content) {
      res.status(201).json(await noteModel.insert(note));
    } else {
      res.status(400).json({ error: 'Note must contain title and content' });
    }
});

router.get('/', async (req, res) => {
    const note = await noteModel.get()
    res.status(200).json(note);
});

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const note = await noteModel.get(req.params.id);
        res.status(200).json(note);
    } catch (e) {
        res.status(404).json({error: "Invalid id"});
    }
});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

module.exports = router;