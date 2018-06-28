const router = require('express').Router();
const Subtask = require('../models/Subtask');
const { sendErr, sendRes } = require('../utils/apiResponses');

router.post('/', (req, res) => {
  const newSubtask = req.body;

  Subtask.create(newSubtask)
    .then(subtask => {
      sendRes(res, '201', subtask);
    })
    .catch(err => {
      sendErr(res, err, 'The subtask could not be created.');
    });
});

module.exports = {
  subtasksRouter: router
};
