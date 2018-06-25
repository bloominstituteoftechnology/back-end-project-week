const express = require('express');
const router = express.Router();

const noteModel = require("./noteModel")

router
    .route('/')
        .post((req,res) => {
            const { title, note } = req.body;
            console.log({ title, note });
            const newNote = new noteModel({ title, note})
            newNote.save()
                .then(item => {
                    res.status(201).json(item)
                })
                .catch(err => {
                    res.status(500).json({ error: "there was an error while posting stuff"})
                })
        })


        .get((req,res) => {
            noteModel
                .find({})
                    .then(item => {
                        res.status(200).json(item)
                    })
                    .catch(err => {
                        res.status(500).json({err: "no notes found"})
                    })
        })

router
    .route('/:id')
        .get((req,res) => {
            const {id} = req.params
            noteModel.findById(id)
                .then(item => {
                    res.status(200).json(item)
                })
        })

        .delete((req,res) => {
            const {id} = req.params
            noteModel.findByIdAndRemove(id)
                .then(item => {
                    if(item === null){
                        res.status(404).json({ errorMessage: "The item with the specified ID does not something." })
                        return;
                    }

                    res.status(200).json(item)
                })
                .catch(err => {
                    res.status(500).json({error: "the note couldn't be removed"})
                })
        })

        .put((req,res) => {
            const {id} = req.params;
            const { title, note } = req.body;
            noteModel
                .findByIdAndUpdate(id, { title, note })
                    .then(item => {
                        res.status(200).json(item)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "the note couldn't be modefied"})
                    })
        })

module.exports = router;