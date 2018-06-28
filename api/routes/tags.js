const router = require('express').Router();
const Tag = require('../models/Tag');
const { sendErr, sendRes } = require('../utils/apiResponses');

router
  .post('/', (req, res) => {
    const newTag = req.body;

    Tag.create(newTag)
      .then((tag) => {
        sendRes(res, '201', tag);
      })
      .catch(err => {
        sendErr(res, err, 'The tag could not be created.');
      });
  });

module.exports = {
  tagsRouter: router
};
