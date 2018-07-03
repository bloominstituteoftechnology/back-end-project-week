const router = require('express').Router();
const Tag = require('../models/Tag');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/authentication');

router
  .post('/', authenticate, (req, res) => {
    const newTag = req.body;

    Tag.create(newTag)
      .then(tag => {
        sendRes(res, '201', tag);
      })
      .catch(err => {
        sendErr(res, err, 'The tag could not be created.');
      });
  })
  .put('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const updatedTag = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    Tag.findByIdAndUpdate(id, updatedTag, options)
      .then(updatedTag => {
        sendRes(res, '200', updatedTag);
      })
      .catch(err => {
        sendErr(res, err, `The tag with id ${id} could not be modified.`);
      });
  })
  .delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Tag.findByIdAndRemove(id)
      .then(deletedTag => {
        sendRes(res, '200', deletedTag ? { _id: deletedTag._id } : null);
      })
      .catch(err => {
        sendErr(res, err, `The tag with id ${id} could not be removed.`);
      });
  });

module.exports = {
  tagsRouter: router
};
