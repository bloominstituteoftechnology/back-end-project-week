const express = require('express');
const router = express.Router();

let Note = require('../models/note');

router.post('/new', (req, res) => {
    req.assert('author', 'Note author must be set').notEmpty();
    req.assert('content', 'Note must have content').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        console.log(errors);
    } else {
        let note = new Note();
        note.author = req.body.author;
        note.content = req.body.content;

        note.save(function(err){
            if(err){
                console.log(err);
            } else {
                res.status(200).json({ msg: 'Note created', note });
            }
        });
    }
});

router.get('/', (req, res) => {
    Note.find({}, function(err, notes){
        if (err) {
            console.log(err);
        } else {
             res.json({notes:notes});
        }
    });
});

router.post('/edit/:id', (req, res) => {
    let note = {};
    note.author = req.body.author;
    note.content = req.body.content;

    let query = {_id:req.params.id};

    Note.update(query, note, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.status(200).json({ msg: 'Note successfully updated', note:note });
        }
    });
});

router.delete('/:id', (req, res) => {
    let query = {_id:req.params.id};

    Note.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.status(200).json({msg: 'Note deleted successfully!'});
    });
});