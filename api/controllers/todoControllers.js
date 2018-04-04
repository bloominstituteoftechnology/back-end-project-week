const mongoose = require('mongoose');
const Todo = require('../models/todoModels');

const getTodos = (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.status(422);
      res.json(err.message);
      return;
    }
    return res.json(todos);
  });
};

const createNewTodo = (req, res) => {
  // console.log(req.body);
  const newTodo = new Todo(req.body);

  newTodo.save((err, todo) => {
    if (err) {
      res.status(422);
      return res.json(err);
    }
    return res.json(todo);
  });
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  Todo.findOneAndUpdate(id, req.body, { new: true }, (err, todo) => {
      if (err) {
        return res.json(err);
      }
      return res.json(todo);
    }
  );
};

const deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) {
      return res.json(err);
    }
    return res.json(todo);
  });
};

module.exports = { getTodos, createNewTodo, updateTodo, deleteTodo };