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
            res.status(400).json(e)})
    })
    .get((req, res) => {
        Todo.find().then(response => {
            res.status(200).json({response})
        })
        .catch(e =>{
            res.status(400).json({error: 'could not fetch todos'})
        })
    })

module.exports = router;