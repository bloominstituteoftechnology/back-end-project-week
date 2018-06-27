const router = require('express').Router();
const Task = require('../models/Task');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
  .post('/', (req, res) => {
    const {
      project,
      title,
      description,
      assignee,
      dueDate,
      subtasks,
      tags,
      completed,
      comments,
      attachments
    } = req.body;

    Task.create({
      project,
      title,
      description,
      assignee,
      dueDate,
      subtasks,
      tags,
      completed,
      comments,
      attachments
    })
      .then(task => {
        res.status(201).json(task);
      })
      .catch(err => {
        sendErrorMessage(err, res, 'The task could not be created.');
      });
  })
  .get('/', (req, res) => {
    Task.find({})
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
  });

// router
//   .post()
//   .get()
//   .get()
//   .put()
//   .delete();

module.exports = {
  tasksRouter: router
};
