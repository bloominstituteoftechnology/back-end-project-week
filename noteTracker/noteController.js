const express = require('express');
const router = express.Router();

const Note = require('./Note');

router
.route('/')
.get((req, res) => {
    Note.find()
    //.select('title')
    .then(note => 
        res.json(note))
    .catch(err => res.status(500).json({ error: 'The category information could not be retrieved.' }));
})
.post((req, res) => {
    const { title, body } = req.body;
    const newNote = new Note({ title, body });
newNote
    .save()
    .then(savedNote => {
        res.status(201).json({savedNote});
    })
    .catch(err => {
        res.status(500).json({ error: err });
    })
});


router
.route('/:id')   
.delete((req, res) => {
        const { id } = req.params;
        Note.findByIdAndRemove( id ) 
        .then(deletedNote => {
            if(deletedNote === null){
                res.status(404).json({ error: 'The note with the specified ID does not exist.'});
                return;
            }
            res.json({ success: 'note deleted.',  resource: deletedNote});
        })
        .catch(err => 
            res.status(500).json({ error: 'The note could not be removed.'})) ;
    })

   
.put((req, res) => {
        const { id } = req.params;
        const updates = ({ title, body } = req.body);
        /*if ( !title || !body ) {
            res.status(400).json({ error: 'Please provide title & body' });
            return;
        }*/
    Note.findByIdAndUpdate( id, updates, { new: true })
            .then(updatedNote => {
                if(updatedNote === null){
                    res.status(404).json({ error: 'The note with the specified ID does not exist.'});
                    return;
                }
                res.status(201).json({ sucess: 'Updated note.', resource: updatedNote});
            })
            .catch(err => 
                res.status(500).json({ error: 'The note information could not be modified.' })); 
            });     

module.exports = router;