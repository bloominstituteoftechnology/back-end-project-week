const router = require('express').Router();
const Comment = require('../models/Comment');
const { sendErr, sendRes } = require('../utils/apiResponses');

module.exports = {
  commentsRouter: router
};
