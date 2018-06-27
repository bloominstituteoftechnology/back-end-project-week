const router = require('express').Router();
const Task = require('../models/Task');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router.post('/', (req, res) => {
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
