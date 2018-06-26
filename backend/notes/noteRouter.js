const Note = require('./Note');

router
    .route('/')
    .get((req, res) => {
        Note
            .find()
            .select('title')
            .then(foundNotes => {
                res.status(200).json(foundNotes);
            })
            .catch(err => res.status(500).json({ message: 'Error Fetching Notes' }));
    })

    .post((req, res) => {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        Note
            .create(newNote)
            .then(saveNote => {
                res.status(201).json(saveNote);
            })
            .catch(err => {
                res.status(500).json({ message: 'Error Saving Note' });
            });
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Note
            .findById(id)
            .then(foundNote => {
                res.status(200).json(foundNote);
            })
            .catch(err => {
                res.status(404).json({ message: 'No note by that id in DB to get' });
            });
    })

    .delete((req, res) => {
        const { id } = req.params;
        Note.findByIdAndRemove(id)
            .then(byeNote => {
                res.status(204).json(byeNote).end();
            })
            .catch(err => {
                res.status(404).json({ error: 'No note by that id in DB to delete' });
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        const update = req.body;
        const options = {
            new: true,
        };

        Note.findByIdAndUpdate(id, update, options)
            .then(updateNote => {
                res.status(200).json(updateNote);
            })
            .catch(err => {
                res.status(404).json({ error: 'No note by that id in DB to update' })
            })
    });

module.exports = router;