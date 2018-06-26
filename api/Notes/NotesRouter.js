const express = require('express');
const router = require('express').Router();
const Note = require('./noteSchema');
// const Users = require('../Users/userModel');

//GET & POST requests w/o ID
router
    .get('/', (req, res) => {
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

    .post('/', (req, res) => {
        const { title, contents } = req.body;
        //The const note line below is only necessary when using the .save() function
        // const note = new Note({ title, contents });
        Note.create({ title, contents })
            .then(addNote => {
                res.status(201).json(addNote)
            })
            .catch(error => {
                res.status(500).json({
                    errorMessage: 'Your note was not successfully created'
                });
            })
    })
//GET, DELETE, & PUT requests w/ID
router.get('/:id', (req, res) => {
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

        .delete('/:id', (req, res) => {
            const { id } = req.params;

            Note.findByIdAndRemove(id)
                .then(removeNote => {
                    res.status(202).json(removeNote)
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: `Could not delete note with the id ${id}`
                    })
                })
        })

        .put('/:id', (req, res) => {
            const { id } = req.params;
            const noteUpdate = ({ title, contents });
            //Have to double-check naming convention of { title, contents } in front-end

            Note.findByIdAndUpdate(id, noteUpdate, { new: true })
                .then(updateNote => {
                    res.status(201).json(updateNote)
                })
                .catch(error => {
                    res.status(404).json({
                        errorMessage: error.message
                    })
                })
        })

module.exports = router;