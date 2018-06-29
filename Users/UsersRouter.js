const router = require('express').Router(); 

const User = require('./UsersModel.js');
const Note = require('../Notes/NotesModel.js')

router
    .get('/api/users', (req, res) => {
        User.find()
            .select('-password')
            .then(users => {
                res.json(users);
            })
            .catch(error => {
                res.status(500).json(error); 
            });
    });

router
    .route('/api/users/:id')
    .get((req, res) => {
        const { id } = req.params; 
        User 
            .findById(id) 
            .then(response => {
                res.status(200).json(response); 
            })
            .catch(error => {
                res.status(404).json({ error: 'The user that that ID does not exist.' })
            }); 
    })
    .delete((req, res) => {
        const { id } = req.params; 
        User    
            .findByIdAndRemove(id)
            .then(response => {
                if (response == 0) {
                    res.status(404).json({ error: 'The user with that ID does not exist.' })
                    return;
                }
                res.json('User was successfully removed!'); 
            })
            .catch(error => {
                res.status(500).json({ error: 'Error removing user.'}); 
            });
    })

router.route('/api/users/:id/notes')
    .get((req, res) => {
        const { id } = req.params; 
        Note.findById(id)
            .select('title text')
            .then(response => res.json(response))
            .catch(error => res.status(500).json({ error: error.message })); 
    })

module.exports = router; 