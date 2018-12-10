const express = require('express');
const db = require('../database/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({aliveAt: '/notes'})
})

router.get('/get/all', getAllNotes);
router.get('/get/:id', getNoteById);
router.post('/create', createNote);
router.put('/edit/:id', editNote);


module.exports = router;

async function getAllNotes(req, res) {
    // res.status(200).json({aliveAt: '/note/get/all'})
    const notes = await db('notes');
    res.status(200).json(notes);
}

async function getNoteById(req, res) {
    const id = req.params.id;
    const note = await db('notes').where('id' , '=', id).first();
    res.status(200).json(note);
}

async function createNote(req, res) {
    const newNote = req.body;

    if (!newNote.title || !newNote.textBody) {
        res.status(422).json({error: "Note Title and Note TextBody is required"});
        return;
    }

    const note = await db('notes').insert(newNote);
    console.log(note);

    res.status(201).json({success: note[0]})
}

async function editNote(req, res) {
    const id = req.params.id;
    const newData = req.body;

    if (!newData && !newData.title && !newData.textBody && !newData.tags) {
        res.status(422).json({error: "Note Title or Note TextBody is required"});
        return;
    }

    const updatedNote = await db('notes')
        .where('id', '=', id)
        .update({...newData});
    
    console.log(updatedNote);
    if (updatedNote > 0) {
        const note = await db('notes').where('id', '=', id).first();
        res.status(201).json(note);
        return
    } else {
        res.status(500).json({error: "Error updating note"});
    }

}

