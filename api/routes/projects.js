const router = require('express').Router();
const Project = require('../models/Project');
const { sendErr } = require('../utils/apiResponses');

router
  .post('/', (req, res) => {
    const { title, description, members } = req.body;

    Project.create({ title, description, members })
      .then(project => {
        const { _id, title, description } = project;
        res.status(201).json({ _id, title, description });
      })
      .catch(err => {
        sendErr(res, err, 'The project could not be created.');
      });
  })
  .get('/', (req, res) => {
    Project.find({})
      .populate('members', { firstName: 1, lastName: 1 })
      .select({ _id: 1, title: 1, members: 1 })
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        sendErr(res, err, 'The list of projects could not be retrieved.');
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;

    Project.findById(id)
      .populate('members', { firstName: 1, lastName: 1 })
      .select({ _id: 1, title: 1, description: 1, members: 1 })
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
        sendErr(res, err, `The project with id ${id} could not be retrieved.`);
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
      .select({ _id: 1, title: 1, description: 1, members: 1 })
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
        sendErr(res, err, `The project with id ${id} could not be modified.`);
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
        sendErr(res, err, `The project with id ${id} could not be removed.`);
      });
  });

module.exports = {
  projectsRouter: router
};
