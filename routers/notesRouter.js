const express = require('express');
const router = express.Router();
const notes = require('../data/helpers/notesModel')

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

/************************************ NOTES SECTION ***********************************/

/********* Get Notes *************/
router.get('/', (req, res) => {
    notes.get()
        .then((notes) => {
            res.json(notes);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The notes could not be retrieved." });
        });
});

/********* Get Single Note *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    notes.get(id)
        .then(note => {
            if (note) {
                res.json(note);
            } else {
                res
                    .status(404)
                    .json({ message: "The note with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The note information could not be retrieved." });
        });
});


/************* Delete Note *************/
router.delete('/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        notes.remove(id)
            .then(note => {
                if (note) {
                    res.json({ message: "The note was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The note with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The note could not be removed." });
            });
    }
});

/********* Update Note *************/
router.put('/:id', (req, res) => {
    const { id } = req.params
    const newNote = req.body

    if (!newNote.title || !newNote.textBody) {
        res
            .status(400)
            .json({ message: "Please provide title for the note." });
    } else {
       
        if (newNote) {
            notes.update(id, newNote)
                .then(note => {
                   
                        
                        if (note) {
                            res
                                .status(201)
                                .json(note);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The note with the specified ID does not exist." })
                        }
                 
                   
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The note could not be modified." });
                });
        } else {

            res
                .status(404)
                .json({ message: "The note with the specified ID does not exist." })
        }
    }
})

/********* Create New Note *************/
router.post('/', (req, res) => {
    const note = req.body;
    console.log("note:", note)
    if (note.title) {
        notes.insert(note)
            .then(note => {
                res.status(201)
                    .json(note)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to insert note in db" })
            });
    } else {
        res
            .status(400)
            .json({ message: "missing title." })
    }
});

/************* Get Single Project's Actions *************/
/* router.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    projects
        .getProjectActions(id)
        .then(usersActions => {
            if (usersActions === 0) {
                return sendUserError(404, 'No actions in the project', res);
            }
            res.json(usersActions);
        })
        .catch(err => {
            return sendUserError(500, 'Unable to access db', res);
        });
});
 */


module.exports = router;