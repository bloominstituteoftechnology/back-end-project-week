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
            res.status(400).json({errorMessage: 'could not fetch todos'})
        })
    })

router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params
        Todo.findById(id).then(foundTodo => {
            console.log(foundTodo)
            if(foundTodo === null){
                res.status(404).json({errorMessage: 'sorry not Todos for you..'})
                return;
            }
            res.status(200).json(foundTodo)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'no Todo in the db'})
        });
    })
    .delete((req, res) => {
        const {id} = req.params
        Todo.findByIdAndRemove(id)
        .then(destroyTodo => {
            console.log(destroyTodo)
            if(destroyTodo === null){
                res.status(404).json({errorMessage: "You must have completed everything get out while you can"});
                return;
            }
            res.status(200).json({success: 'todos are actually terminated, you are free!!!', resource: destroyTodo})
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'no Todo to destory'})
         });
    })

module.exports = router;