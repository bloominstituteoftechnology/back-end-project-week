const router = require('express').Router();
const Task = require('../models/Task');
const Subtask = require('../models/Subtask');
const Comment = require('../models/Comment');
const Attachment = require('../models/Attachment');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/auth');
const { isProjectMember } = require('../middleware/tasks');

router
  .post('/', authenticate, isProjectMember, (req, res) => {
    const newTask = req.body;
    const authorized = req.validMember;

    if (authorized) {
      Task.create(newTask)
        .then(task => {
          sendRes(res, '201', task);
        })
        .catch(err => {
          sendErr(res, err, 'The task could not be created.');
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .get('/', authenticate, (req, res) => {
    Task.find()
      .then(tasks => {
        sendRes(res, '200', tasks);
      })
      .catch(err => {
        sendErr(res, err, 'The list of tasks could not be retrieved.');
      });
  })
  .get('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Task.findById(id)
      .then(task => {
        sendRes(res, '200', task);
      })
      .catch(err => {
        sendErr(res, err, `The task with id ${id} could not be retrieved.`);
      });
  })
  .get('/:id/subtasks', authenticate, (req, res) => {
    const { id } = req.params;

    Subtask.find({ task: id })
      .then(subtasks => {
        sendRes(res, '200', subtasks);
      })
      .catch(err => {
        sendErr(
          res,
          err,
          `The subtasks for task ${id} could not be retrieved.`
        );
      });
  })
  .get('/:id/comments', authenticate, (req, res) => {
    const { id } = req.params;

    Comment.find({ task: id })
      .then(comments => {
        sendRes(res, '200', comments);
      })
      .catch(err => {
        sendErr(
          res,
          err,
          `The comments for task ${id} could not be retrieved.`
        );
      });
  })
  .get('/:id/attachments', authenticate, (req, res) => {
    const { id } = req.params;

    Attachment.find({ task: id })
      .then(attachments => {
        sendRes(res, '200', attachments);
      })
      .catch(err => {
        sendErr(
          res,
          err,
          `The attachments for task ${id} could not be retrieved.`
        );
      });
  })
  .put('/:id', authenticate, (req, res) => {
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
  .delete('/:id', authenticate, (req, res) => {
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
