const router = require('express').Router();
const Subtask = require('../models/Subtask');
const { sendErr, sendRes } = require('../utils/apiResponses');

module.exports = {
  subtasksRouter: router
};
