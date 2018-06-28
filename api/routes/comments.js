const router = require('express').Router();
const Comment = require('../models/Comment');
const { sendErr, sendRes } = require('../utils/apiResponses');

router
  .post('/', (req, res) => {
    const newComment = req.body;

    Comment.create(newComment)
      .then(comment => {
        sendRes(res, '201', comment);
      })
      .catch(err => {
        sendErr(res, err, 'The comment could not be created.');
      });
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedComment = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    Comment.findByIdAndUpdate(id, updatedComment, options)
      .then(updatedComment => {
        sendRes(res, '200', updatedComment);
      })
      .catch(err => {
        sendErr(res, err, `The comment with id ${id} could not be modified.`);
      });
  });

module.exports = {
  commentsRouter: router
};
