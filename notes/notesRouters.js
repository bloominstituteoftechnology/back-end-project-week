const express = require('express')
const notesDb = require('./notesDataModel')
const router = express.Router()

router.get('/', (req,res) => {
    notesDb.findAll().then(notes => {
        notes.forEach(note => {
            if(!note.tags) note.tags = []
        })
        res.status(200).json(notes)
    }).catch(err => {
        res.json(err)
    })
})

router.get("/:id", (req,res) => {
    const {id} = req.params
    console.log(id)
    notesDb.findById(id).then(note => {
        notes.forEach(note => {
            if(!note.tags) note.tags = []
        })
        res.status(200).json(note)
    }).catch(err => {
        res.json(err)
    })
})

router.post("/", (req,res) => {
    const {title, textBody} = req.body
    notesDb.addNotes({title,textBody}).then(() => {
        notesDb.findAll().then(notes => {
            notes.forEach(note => {
                if(!note.tags) note.tags = []
            })
            res.json(notes)
        }).catch(err => res.json(err))
    }).catch(err => res.json(err))
})

router.put('/:id', (req,res) => {
    const {title, textBody} = req.body
    const {id} = req.params
    notesDb.editNote(id, {title, textBody}).then(() => {
        notesDb.findAll().then(notes => {
            notes.forEach(note => {
                if(!note.tags) note.tags = []
            })
            res.json(notes)
        })
    })
})

router.delete('/:id', (req,res) => {
    const {id} = req.params
    notesDb.deleteNote(id).then(() => {
        notesDb.findAll().then(notes => {
            notes.forEach(note => {
                if(!note.tags) note.tags = []
            })
            res.json(notes)
        })
    })
})

module.exports = router