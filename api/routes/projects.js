const router = require('express').Router();
const Project = require('../models/Project');
const { sendErr, sendRes } = require('../utils/apiResponses');

router
  .post('/', (req, res) => {
    const newProject = req.body;

    Project.create(newProject)
      .then(({ _id, title, description }) => {
        sendRes(res, '201', { _id, title, description });
      })
      .catch(err => {
        sendErr(res, err, 'The project could not be created.');
      });
  })
  .get('/', (req, res) => {
    Project.find()
      .populate('members', { firstName: 1, lastName: 1 })
      .select({ title: 1, members: 1 })
      .then(projects => {
        sendRes(res, '200', projects);
      })
      .catch(err => {
        sendErr(res, err, 'The list of projects could not be retrieved.');
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;

    Project.findById(id)
      .populate('members', { firstName: 1, lastName: 1 })
      .select({ title: 1, description: 1, members: 1 })
      .then(project => {
        sendRes(res, '200', project);
      })
      .catch(err => {
        sendErr(res, err, `The project with id ${id} could not be retrieved.`);
      });
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    Project.findByIdAndUpdate(id, updatedProject, options)
      .populate('members', { firstName: 1, lastName: 1 })
      .select({ title: 1, description: 1, members: 1 })
      .then(updatedProject => {
        sendRes(res, '200', updatedProject);
      })
      .catch(err => {
        sendErr(res, err, `The project with id ${id} could not be modified.`);
      });
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Project.findByIdAndRemove(id)
      .then(deletedProject => {
        sendRes(res, '200', deletedProject ? { _id: deletedProject._id } : null);
      })
      .catch(err => {
        sendErr(res, err, `The project with id ${id} could not be removed.`);
      });
  });

module.exports = {
  projectsRouter: router
};
