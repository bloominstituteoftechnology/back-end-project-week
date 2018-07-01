const router = require('express').Router();
const Subtask = require('../models/Subtask');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/auth');

router
  .post('/', authenticate, (req, res) => {
    const newSubtask = req.body;

    Subtask.create(newSubtask)
      .then(subtask => {
        sendRes(res, '201', subtask);
      })
      .catch(err => {
        sendErr(res, err, 'The subtask could not be created.');
      });
  })
  .put('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const updatedSubtask = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    Subtask.findByIdAndUpdate(id, updatedSubtask, options)
      .then(updatedSubtask => {
        sendRes(res, '200', updatedSubtask);
      })
      .catch(err => {
        sendErr(res, err, `The subtask with id ${id} could not be modified.`);
      });
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
