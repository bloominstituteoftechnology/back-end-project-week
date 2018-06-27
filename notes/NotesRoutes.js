const express = require('express');
const Notes = require('./Notes');
const router = express.Router();


let ObjectID = require('mongodb').ObjectID;



//create note with title and content.
router.post('/api/notes',(req, res) => {
    const note = { title: req.body.body, content: req.body.text };
    db.collection('Notes').insert(note, (err, results) => { 
        if (err) {
            res.send({ 'error': 'Error has occured' });
        } else {
            res.send(result.ops[0]);
        }
    })
});

router.get('/api/notes/:id',(req, res) => {
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

//remove a note
router.delete('/api/notes/:id',(req, res) => {
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

//Edit a note
router.put('/api/notes/:id',(req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { title: req.body.body, content: req.body.text };
    db.collection('Notes').update(details, note, (err, result) => {
        if (err) {
            res.send({ 'error': 'Error has occurred' });
        } else {
            res.send('Notes' + id + 'deleted!!!');
        }
        // .catch (err => {
        //     res
        //         .status(500)
        //         .json({ message: 'ERROR', error: err });
        // });
    });
    
});



module.exports = router;