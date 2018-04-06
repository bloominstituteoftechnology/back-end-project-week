const express = require('express');
const mongoose = require('mongoose');

const Note = require('../Models/NoteModel');

const User = require('../Models/UserModel');

const createNote = (req, res) => {
    const { Title, Content, UserId } = req.body;
    const Note = new NoteModel(req.body);

    newNote
        .save()
        .then(newNote => {
            res.status(201).send(newNote)
        })
        .catch(err => {
            res.status(500).send({
                err: 'Unable to save Note'
            });
        });
};

const getNotes = (req, res) => {
    const { Username } = req.body;
    const id = User._id;
    User.findById(_id)
        .populate('Notes')
        .then(res.send())
        .catch(err => {
            res.status(200).send(err);
        });
};

const editNote = (req, res) => {
    const{ id, title, content } = req.body
    const updateNote = {
        title,
        content,
    }
    if (req.decoded) {
        Note.findByIdAndUpdate(id, updateNote, { new: true })
            .then(Note => {
                res.status(201)
                    .json({
                        message: 'Note has been updated'
                    });
            })
            .catch(err => {
                res.status(500)
                    .json(err);
            });
    };
};

const deleteNote = (req, res) => {
    const { UserId } = req.body;
    Note.findByIdAndRemove(UserId)
        .then(Note => {
            res.json('Note deleted');
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

module.exports = {
    createNote,
    getNotes,
    editNote,
    deleteNote,
};