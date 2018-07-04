const router = require('express').Router();
const Comment = require('../models/Comment');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/authentication');
const { isTaskAccessible } = require('../middleware/permissions');

router
  .post('/', authenticate, isTaskAccessible, (req, res) => {
    const { task, comment } = req.body;
    const author = req.tokenPayload.userid;
    const authorized = req.taskAccessible;
    const newComment = {
      task: task,
      comment: comment,
      author: author,
      date: Date.now()
    };

    if (authorized) {
      Comment.create(newComment)
        .then(comment => {
          sendRes(res, '201', comment);
        })
        .catch(err => {
          sendErr(res, err, 'The comment could not be created.');
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .put('/:id', authenticate, (req, res) => {
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
  })
  .delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Comment.findByIdAndRemove(id)
      .then(deletedComment => {
        sendRes(
          res,
          '200',
          deletedComment ? { _id: deletedComment._id } : null
        );
      })
      .catch(err => {
        sendErr(res, err, `The comment with id ${id} could not be removed.`);
      });
  });

module.exports = {
  commentsRouter: router
};
