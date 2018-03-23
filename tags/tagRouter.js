const express = require('express');
const db = require('./tagController.js');

const tagRouter = express.Router();

tagRouter.get('/', (req, res) => {
  db
    .getAll()
    .then(tags => {
      res.status(200).send(tags);
    }).catch(err => {
      res.status(500).send({ msg: 'Error retrieving tags.' });
    })
});

tagRouter.post('/', (req, res) => {
  const newTag = req.body;

  if (!newTag) {
    res.status(400).send({ msg: 'Please include a tag to add.' });
  } else {
    db
      .addTag(newTag)
      .then(tag => {
        res.status(201).send({ msg: 'Tag successfully created.', tag_id: tag });
      }).catch(err => {
        res.status(500).send({ msg: 'Error adding tag.', error: err });
      })
  }
});

tagRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getById(id)
    .then(tag => {
      if (tag.length > 0) {
        res.status(200).send(tag);
      } else {
        res.status(404).send({ msg: `Tag with ID: ${id} not found.` });
      }
    }).catch(err => {
      res.status(500).send({ msg: 'Error retrieving tag.' });
    })
});

tagRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedTag = req.body;

  db
    .updateTag(id, updatedTag)
    .then(count => {
      if (count > 0) {
        res.status(200).send({ msg: 'Tag updated successfully.' });
      } else {
        res.status(404).send({ msg: `Tag with ID: ${id} not found.` });
      }
    }).catch(err => {
      res.status(500).send({ msg: 'Error updating tag.'});
    })
});

tagRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .nuke(id)
    .then(count => {
      if (count > 0) {
        res.status(200).send({ msg: 'Tag deleted successfully.' });
      } else {
        res.status(404).send({ msg: `Tag with ID: ${id} not found.` });
      }
    }).catch(err => {
      res.status(500).send({ msg: 'Error deleting tag.' });
    })
});

module.exports = tagRouter;