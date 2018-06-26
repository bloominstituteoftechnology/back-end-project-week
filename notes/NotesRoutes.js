// const Notes = require('./notes/Notes');

const express = require('express');
const cors = require('cors');

let ObjectID = require('mongodb').ObjectID;


router.route('api/notes').post((req, res) => {
    const note = { title: req.body.body, content: req.body.text };
    db.collection('Notes').insert(note, (err, results) => { 
        if (err) {
            res.send({ 'error': 'Error has occured' });
        } else {
            res.send(result.ops[0]);
        }
    })
});

router.route('/api/notes/:id').get((req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('Notes').findOne(details, (err, item) => {
        if (err) {
            res.send({ 'error': 'Error has occurred' });
        } else {
            res.send(item);
        }
    });
});


router.route('/api/notes/:id').delete((req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('Notes').remove(details, (err, item) => {
        if (err) {
            res.send({ 'error': 'Error has occurred' });
        } else {
            res.send('Notes' + id + 'deleted!!!');
        }
    });
});

router.route('/api/notes/:id').put((req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { title: req.body.body, content: req.body.text };
    db.collection('Notes').update(details, note, (err, result) => {
        if (err) {
            res.send({ 'error': 'Error has occurred' });
        } else {
            res.send('Notes' + id + 'deleted!!!');
        }
    });
});


// module.exports = function (app, db) { };
module.exports = NotesRoutes;