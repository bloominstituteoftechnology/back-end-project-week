const router = require('express').Router();

router
    .route('/')
    .get((req, res) => {
        Note.find({})
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(404).json(err);
        })
    })
    .post((req, res) => {
        const note = new Note(req.body);
        const {title, content} = req.body;

        note
        .save()
        .then(savedNote => {
            res.status(201).json(savedNote);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
    
router
    .route('/:id')
    .get((req, res) => {
        Note.findbyId(req.params.id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
    .delete((req, res) => {
        const { id } = req.params;
        Note.findbyIdandRemove(id)
        .then(note => {
            res.status(200).json(note)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    })
    .put((req, res) => {
        Note.findbyIdAndUpdate(req.params.id, req.body)
        .then(note => {
            res.status(200).json(note)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    })

    module.exports = router;