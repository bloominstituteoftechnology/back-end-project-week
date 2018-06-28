const router = require('express').Router();
const Comment = require('../models/Comment');
const { sendErr, sendRes } = require('../utils/apiResponses');

router.post('/', (req, res) => {
  const newComment = req.body;

  Comment.create(newComment)
    .then(comment => {
      sendRes(res, '201', comment);
    })
    .catch(err => {
      sendErr(res, err, 'The comment could not be created.');
    });
});

module.exports = {
  commentsRouter: router
};
