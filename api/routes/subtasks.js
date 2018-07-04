const router = require('express').Router();
const Subtask = require('../models/Subtask');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/authentication');
const { isTaskAccessible } = require('../middleware/permissions');

router
  .post('/', authenticate, isTaskAccessible, (req, res) => {
    const newSubtask = req.body;
    const authorized = req.taskAccessible;

    if (authorized) {
      Subtask.create(newSubtask)
        .then(subtask => {
          sendRes(res, '201', subtask);
        })
        .catch(err => {
          sendErr(res, err, 'The subtask could not be created.');
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .put('/:id', authenticate, isTaskAccessible, (req, res) => {
    const { id } = req.params;
    const updatedSubtask = req.body;
    const authorized = req.taskAccessible;
    const options = {
      new: true,
      runValidators: true
    };

    if (authorized) {
      Subtask.findByIdAndUpdate(id, updatedSubtask, options)
        .then(updatedSubtask => {
          sendRes(res, '200', updatedSubtask);
        })
        .catch(err => {
          sendErr(res, err, `The subtask with id ${id} could not be modified.`);
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Subtask.findByIdAndRemove(id)
      .then(deletedSubtask => {
        sendRes(
          res,
          '200',
          deletedSubtask ? { _id: deletedSubtask._id } : null
        );
      })
      .catch(err => {
        sendErr(res, err, `The subtask with id ${id} could not be removed.`);
      });
  });

module.exports = {
  subtasksRouter: router
};
