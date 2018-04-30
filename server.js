const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('morgan')
const cool = require('cool-ascii-faces')

const Todo = require('./todos/Todo')

const server = express()

mongoose
  .connect(`mongodb://localhost/todoDB`)
  .then(() => console.log(`\n=== Mongo Online ===\n`))
  .catch(err => console.log(err))

server.use(helmet())
server.use(logger('dev'))
server.use(express.json())

server.get('/', (req, res) => res.json({ msg: `Server Online` }))

server.get('/cool', (req, res) => res.send(cool()))
server.get('/api/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.status(200).json(todos)
    })
    .catch(err => res.status(500).json(err))
})

let todoId = 0

server.post('/api/todos', (req, res) => {
  const { title, content } = req.body
  const newTodo = { todoId, title, content }
  todoId++

  const todo = new Todo(newTodo)
  todo
    .save()
    .then(msg => {
      Todo.find().then(todos => {
        res.status(201).json(todos)
      })
    })
    .catch(err => res.status(500).json(err))
})

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`\n API running on http://localhost:${port}`)
})
