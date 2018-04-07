const mongoose = require('mongoose');
const Todo = require('../models/todo.server.model');

const getTodos = (req, res) => {
  Todo.find( ({}), (err,todos) => {
    if(err) {
      return res.json(err);
    }
    return res.json(todos);
  });
};

const addTodo = (req,res) => {
  const newTodo = new Todo(req.body);

  newTodo.save( (err, todo) => {
    if (err) {
      return res.json(err);
    }
    return res.json(todo);
  });
};

const updateTodo = (req,res) => {
  Todo.findOneandUpdate( {_id:req.body.id}, req.body, {new: true}, (err,todo) => {
    if (err) {
      return res.json(err);
    }
    return res.json(todo);
  });
};

const deleteTodo = (req,res) => {
  Todo.findByIdAndRemove(req.params.id, (err,todo) => {
    if (err) {
      return res.json(err);
    }
    return res.json(todo);
  });
};
