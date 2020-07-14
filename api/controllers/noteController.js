const express = require("express")
const router = express.Router();

const Note = require("../models/noteModel");
const User = require("../models/userModel")


const Get = (req, res) => {
    const { username, id } = req.decoded;
    Note
        .find({ postedBy: id })
        .populate('postedBy', { username: 1, _id: 0 })
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ error: 'Server error fetching notes.' }))
}

const Post = async (req, res) => {
    const { username, id } = req.decoded;
    const user = await User.findById(id)
    const newNote = { title: req.body.title, content: req.body.content, postedBy: id }
    Note
        .create(newNote)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ error: 'Server error creating new note.' }))
}
const Get_Id = (req, res) => {
    const { id } = req.params;
    Note
        .findById(id)
        .then(note => res.status(200).json(note))
        .catch(err => res.status(500).json({ message: 'Server error: check Id.' }))
}
const Put = (req, res) => {
    const { id } = req.params;
    Note
        .findByIdAndUpdate(id, req.body, { new: true })
        .then(updated => res.status(200).json(updated))
        .catch(err => res.status(500).json({ error: 'Server error updating.' }))
}

const Delete = (req, res) => {
    const { id } = req.params;
    Note
        .findByIdAndRemove(id)
        .then(success => res.status(200).json({ message: 'Note deleted.' }))
        .catch(err => res.status(500).json({ error: 'Server error deleting.' }))
}

router.route("/")
    .get(Get)
    .post(Post);

router.route('/:id')
    .get(Get_Id)
    .put(Put)
    .delete(Delete)


module.exports = router;