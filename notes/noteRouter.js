const express = require('express');
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = express.Router();

router.get("/", (req, res) => {
    db("notes")
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({error: err}))
})

router.get("/:id", (req, res) => {
    let { id } = req.params;

    db("notes")
        .where({id})
        .then(note => res.status(200).json(...note))
        .catch(err => res.status(500).json({error: err}))
})

router.post("/", (req, res) => {
    let { title, content } = req.body;

    if (!title) {
        return res.status(405).json({error: "Please enter a title."});
    }
    if (!content) {
        return res.status(405).json({error: "Please enter some content in the note."});
    }

    db("notes")
        .insert({ title, content })
        .then(id => res.status(200).json(id))
        .catch(err => res.status(500).json({error: err}))
})

router.put("/:id", (req, res) => {
    let { title, content } = req.body;
    let { id } = req.params;

    if (!title) {
        return res.status(405).json({error: "Please enter a title."});
    }
    if (!content) {
        return res.status(405).json({error: "Please enter some content in the note."});
    }

    db("notes")
        .where({id})
        .update({ title, content })
        .then(count => {
            count ?
            res.status(200).json(count) :
            res.status(400).json({error: "Please enter a valid id"});
        })
        .catch(err => res.status(500).json({error: err}))
})

router.delete("/:id", (req, res) => {
    let { id } = req.params;

    db("notes")
        .where({id})
        .del()
        .then(count => {
            count ?
            res.status(200).json(count) :
            res.status(400).json({error: "Please enter a valid id"});
        })
        .catch(err => res.status(500).json({error: err}))
})

module.exports = router;