const express = require('express');
const router = require('express').Router();
const Notes = require('./noteModel');
const Users = require('../Users/userModel');

//GET & POST requests w/o ID
router
    .route('/')
        .get((req, res) => {
            Note.find()
                .then(note => {
                    res.json(note)
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: 'Your notes could not be retrieved'
                    });
                })
        })

        .post((req, res) => {
            Note.create()
                .then(note => {
                    res.status(201).json(note)
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: 'Your note was not successfully created'
                    });
                })
        })

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;

            Note.findById(id)
                .then(note => {
                    res.json(note)
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: `The note with id ${id} could not be retrieved`
                })
            })
        })

        .delete((req, res) => {
            const { id } = req.params;

            if(!Note.findById(id)) {
                res.status(404).json({
                    errorMessage: error.message
                })
            }

            Note.findById(id)
                .then(note => {
                    res.status(202).json(note)
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: `Could not delete note with the id ${id}`
                    })
                })
        })

        .put((req, res) => {
            const { id } = req.params;
            //Have to double-check naming convention of { title, content } in front-end
            const { title, content } = req.body;

            if(!Note.findById(id)) {
                res.status(404).json({
                    errorMessage: error.message
                })
            }

            Note.findByIdAndUpdate(id, req.body)
                .then(note => {
                    res.status(201).json(note)
                })
                .catch(error => {
                    res.status(404).json({
                        errorMessage: error.message
                    })
                })
        })

module.exports = router;