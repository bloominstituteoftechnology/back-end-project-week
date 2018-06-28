const router = require('express').Router();
const Attachment = require('../models/Attachment');
const { sendErr, sendRes } = require('../utils/apiResponses');

router.post('/', (req, res) => {
  const newAttachment = req.body;

  Attachment.create(newAttachment)
    .then(attachment => {
      sendRes(res, '201', attachment);
    })
    .catch(err => {
      sendErr(res, err, 'The attachment could not be created.');
    });
});

module.exports = {
  attachmentsRouter: router
};
