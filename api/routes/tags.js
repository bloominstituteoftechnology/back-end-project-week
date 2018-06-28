const router = require('express').Router();
const Tag = require('../models/Tag');
const { sendErr, sendRes } = require('../utils/apiResponses');

module.exports = {
  tagsRouter: router
}