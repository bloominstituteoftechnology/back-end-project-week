const router = require('express').Router();
const Task = require('../models/Task');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
  .post('/', (req, res) => {
    const newTask = req.body;

    Task.create(newTask)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(err => {
        sendErrorMessage(err, res, 'The task could not be created.');
      });
  })
  .get('/', (req, res) => {
    Task.find()
      .then(tasks => {
        res.status(200).json(tasks);
      })
      .catch(err => {
        sendErrorMessage(err, res, 'The list of tasks could not be retrieved.');
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;

    Task.findById(id)
      .then(task => {
        if (task) {
          res.status(200).json(task);
        } else {
          res
            .status(404)
            .json({ error: `The task with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The task with id ${id} could not be retrieved.`
        );
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
        if (updatedTask) {
          res.status(200).json(updatedTask);
        } else {
          res
            .status(404)
            .json({ error: `The task with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The task with id ${id} could not be modified.`
        );
      });
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Task.findByIdAndRemove(id)
      .then(deletedTask => {
        if (deletedTask) {
          const { _id } = deletedTask;
          res.status(200).json({ _id });
        } else {
          res
            .status(404)
            .json({ error: `The task with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The task with id ${id} could not be removed.`
        );
      });
  });

module.exports = {
  tasksRouter: router
};
