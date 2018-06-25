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
                .find({}, '-_id')
                    .then(item => {
                        res.status(200).json(item)
                    })
                    .catch(err => {
                        res.status(500).json({err: "no notes found"})
                    })
        })

module.exports = router;