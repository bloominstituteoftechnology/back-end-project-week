const Note = require('../Models/noteModel');

const User = require('../Models/userModel');

const createNote = (req, res) => {
    const {Title, content, userId} = req.body;
    const note = new noteModel(req.body);

    newNote
        .save()
        .then(newNote => {
            res.status(201).send(newNote)
        })
        .catch(err => {
            res.status(500).send({
                err: 'unable to save note'
            });
        });
};


const getNotes = (req, res) => {
    const {username} = req.body;
    User.findById(_id)
        .populate('notes')
        .then(res.send())
        .catch(err => {
            res.status(200).send(err);
        });
};