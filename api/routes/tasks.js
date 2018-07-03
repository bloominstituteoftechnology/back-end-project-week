const router = require('express').Router();
const Task = require('../models/Task');
const Subtask = require('../models/Subtask');
const Comment = require('../models/Comment');
const Attachment = require('../models/Attachment');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/auth');
const {
  isProjectMember,
  isTaskAccessible,
  getProjects
} = require('../middleware/tasks');

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
  .get('/', authenticate, getProjects, (req, res) => {
    const validProjects = req.projects;

    Task.find({ project: { $in: validProjects } })
      .then(tasks => {
        sendRes(res, '200', tasks);
      })
      .catch(err => {
        sendErr(res, err, 'The list of tasks could not be retrieved.');
      });
  })
  .get('/:id', authenticate, isTaskAccessible, (req, res) => {
    const { id } = req.params;
    const authorized = req.taskAccessible;

    if (authorized) {
      Task.findById(id)
        .then(task => {
          sendRes(res, '200', task);
        })
        .catch(err => {
          sendErr(res, err, `The task with id ${id} could not be retrieved.`);
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .get('/:id/subtasks', authenticate, isTaskAccessible, (req, res) => {
    const { id } = req.params;
    const authorized = req.taskAccessible;

    if (authorized) {
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
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
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
  .put('/:id', authenticate, isTaskAccessible, (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    const authorized = req.taskAccessible;
    const options = {
      new: true,
      runValidators: true
    };

    if (authorized) {
      Task.findByIdAndUpdate(id, updatedTask, options)
        .then(updatedTask => {
          sendRes(res, '200', updatedTask);
        })
        .catch(err => {
          sendErr(res, err, `The task with id ${id} could not be modified.`);
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .delete('/:id', authenticate, isTaskAccessible, (req, res) => {
    const { id } = req.params;
    const authorized = req.taskAccessible;

    if (authorized) {
      Task.findByIdAndRemove(id)
        .then(deletedTask => {
          sendRes(res, '200', deletedTask ? { _id: deletedTask._id } : null);
        })
        .catch(err => {
          sendErr(res, err, `The task with id ${id} could not be removed.`);
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  });

module.exports = {
  tasksRouter: router
};
