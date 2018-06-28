const router = require('express').Router();
const Tag = require('../models/Tag');
const { sendErr, sendRes } = require('../utils/apiResponses');

router
  .post('/', (req, res) => {
    const newTag = req.body;

    Tag.create(newTag)
      .then(tag => {
        sendRes(res, '201', tag);
      })
      .catch(err => {
        sendErr(res, err, 'The tag could not be created.');
      });
  })
  .put('/:id', (req, res) => {
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
  });

module.exports = {
  tagsRouter: router
};
