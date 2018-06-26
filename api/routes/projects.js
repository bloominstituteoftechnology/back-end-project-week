const router = require('express').Router();
const Project = require('../models/Project');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
  .post('/', (req, res) => {
    const { title, description, members } = req.body;

    Project.create({ title, description, members })
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        sendErrorMessage(err, res, 'The project could not be created.');
      });
  })
  .get('/', (req, res) => {
    Project.find({})
      .populate('members', { firstName: 1, lastName: 1 })
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The list of projects could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;

    Project.findById(id)
      .populate('members', { firstName: 1, lastName: 1 })
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res
            .status(404)
            .json({ error: `The project with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The project with id ${id} could not be retrieved.`
        );
      });
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, members } = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    Project.findByIdAndUpdate(id, { title, description, members }, options)
      .populate('members', { firstName: 1, lastName: 1 })
      .then(updatedProject => {
        if (updatedProject) {
          res.status(200).json(updatedProject);
        } else {
          res
            .status(404)
            .json({ error: `The project with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The project with id ${id} could not be modified.`
        );
      });
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Project.findByIdAndRemove(id)
      .then(deletedProject => {
        if (deletedProject) {
          const { _id } = deletedProject;
          res.status(200).json({ _id });
        } else {
          res
            .status(404)
            .json({ error: `The project with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The project with id ${id} could not be removed.`
        );
      });
  });

module.exports = {
  projectsRouter: router
};
