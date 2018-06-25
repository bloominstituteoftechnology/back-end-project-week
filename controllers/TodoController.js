const router = require('express').Router();

const Todo = require('../models/Todo');

router
    .route('/')
    .post((req, res) => {
        const newTodo = {title, text} = req.body
        Todo.create(newTodo)
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(e => {
            res.status(400).json(e)
        })
    })

module.exports = router;