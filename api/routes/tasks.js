const router = require('express').Router();
const Task = require('../models/Task');
const { sendErr, sendRes } = require('../utils/apiResponses');

router
  .post('/', (req, res) => {
    const newTask = req.body;

    Task.create(newTask)
      .then(task => {
        sendRes(res, '201', task);
      })
      .catch(err => {
        sendErr(res, err, 'The task could not be created.');
      });
  })
  .get('/', (req, res) => {
    Task.find()
      .then(tasks => {
        sendRes(res, '200', tasks);
      })
      .catch(err => {
        sendErr(res, err, 'The list of tasks could not be retrieved.');
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;

    Task.findById(id)
      .then(task => {
        sendRes(res, '200', task);
      })
      .catch(err => {
        sendErr(res, err, `The task with id ${id} could not be retrieved.`);
      });
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    Task.findByIdAndUpdate(id, updatedTask, options)
      .then(updatedTask => {
        sendRes(res, '200', updatedTask);
      })
      .catch(err => {
        sendErr(res, err, `The task with id ${id} could not be modified.`);
      });
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Task.findByIdAndRemove(id)
      .then(deletedTask => {
        sendRes(res, '200', deletedTask ? { _id: deletedTask._id } : null);
      })
      .catch(err => {
        sendErr(res, err, `The task with id ${id} could not be removed.`);
      });
  });

module.exports = {
  tasksRouter: router
};
