const router = require('express').Router();
const Project = require('../models/Project');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
.post('/', (req, res) => {
  const { title, description, members, tags } = req.body;

  Project.create({ title, description, members, tags })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      sendErrorMessage(err, res, 'The project could not be created.');
    });
})
// .get('/', (req, res) => {})
// .get('/:id', (req, res) => {})
// .update('/:id', (req, res) => {})
// .delete('/:id', (req, res) => {});

module.exports = {
  projectsRouter: router
};
