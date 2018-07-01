const router = require('express').Router();
const Attachment = require('../models/Attachment');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/auth');

router
  .post('/', authenticate, (req, res) => {
    const newAttachment = req.body;

    Attachment.create(newAttachment)
      .then(attachment => {
        sendRes(res, '201', attachment);
      })
      .catch(err => {
        sendErr(res, err, 'The attachment could not be created.');
      });
  })
  .delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Attachment.findByIdAndRemove(id)
      .then(deletedAttachment => {
        sendRes(
          res,
          '200',
          deletedAttachment ? { _id: deletedAttachment._id } : null
        );
      })
      .catch(err => {
        sendErr(res, err, `The attachment with id ${id} could not be removed.`);
      });
  });

module.exports = {
  attachmentsRouter: router
};
