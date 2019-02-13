const express = require("express")
const router = express.Router();
const notes = require('../helpers/notesModel')

router.get('/get/all', async (req, res) => {

    const list = await notes.fetchAll()
    res.status(200).json(list)

})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
   await notes.fetchById(id)
        .then(note => {
            note
                ? res.status(200).json(note)
                : res.status(400).json({error: "The note does not exist"})
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.post('/create', (req, res) => {
    const { title, textBody } = req.body;
    if (title.length && textBody.length < 128) {
        notes.addNote(req.body)
            .then(note => {
                res.status(201).json(note)
            })
            .catch(err => {
                res.status(500).json({
                    error: "Error when adding new note"
                })
            })
    } else {
     res.status(400).json({error: "Please add a note and title."})
    }
})

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    notes.deleteNote(id)
        .then(count => {
            count
                ? notes.fetchAll().then(note => {
                    res.status(200).json(note)
                })
                : res.status(404).json(({ error: "Invalid Id" }))
        })
})


router.put('/edit/:id', (req, res) => {
    const { id } = req.params
    const { title, textBody } = req.body;

    if (title && textBody.length < 128) {
        notes.editNote(id, req.body).then(count => {
            count ? notes.fetchById(id).then(note => {
                res.json(note)
            })
                : res.status(404).json({error: "The id you are looking for is not found"})
        })
            .catch(err => {
                res.status(500).json({error: "Can not update this note"})
            })
    } else {
        res.status(400).json({error: " Please provide, title or text body"})
    }
})

module.exports = router;