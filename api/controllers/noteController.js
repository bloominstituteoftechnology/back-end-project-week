const NoteModel = require('../models/noteModel');

const createNote = (req, res) => {
    const user = new NoteModel(req.body);
    user.save()
        .then(usr => res.status(201).send(usr))
        .catch(err => {
            res.status(500).send({error: "Something went wrong saving your note information", info: err});
        });
};

const getNotes = (req, res) => {
    NoteModel.find({})
        .populate()
        .exec((err, resp) => res.status(200).send(resp));
};

module.exports = {getNotes, createNote};