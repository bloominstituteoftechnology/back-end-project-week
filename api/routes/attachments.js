const router = require('express').Router();
const Attachment = require('../models/Attachment');
const { sendErr, sendRes } = require('../utils/apiResponses');

module.exports = {
  attachmentsRouter: router
};
