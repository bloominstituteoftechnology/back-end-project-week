const router = require('express').Router();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Tag = require('../models/Tag');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate, isValidProjectUser } = require('../middleware');

router
  .post('/', authenticate, (req, res) => {
    const newProject = req.body;

    Project.create(newProject)
      .then(({ _id, title, description }) => {
        sendRes(res, '201', { _id, title, description });
      })
      .catch(err => {
        sendErr(res, err, 'The project could not be created.');
      });
  })
  .get('/', authenticate, (req, res) => {
    const currentUser = mongoose.Types.ObjectId(req.tokenPayload.userid);

    Project.find({ members: currentUser })
      .populate('members', { firstName: 1, lastName: 1 })
      .select({ title: 1, members: 1 })
      .then(projects => {
        sendRes(res, '200', projects);
      })
      .catch(err => {
        sendErr(res, err, 'The list of projects could not be retrieved.');
      });
  })
  .get('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const currentUser = req.tokenPayload.userid;

    Project.findById(id)
      .populate('members', { firstName: 1, lastName: 1 })
      .select({ title: 1, description: 1, members: 1 })
      .then(project => {
        if (project.isValidUser(currentUser)) {
          sendRes(res, '200', project);
        } else {
          sendErr(res, '403', 'User is not authorized to perform this action.');
        }
      })
      .catch(err => {
        sendErr(res, err, `The project with id ${id} could not be retrieved.`);
      });
  })
  .get('/:id/tags', authenticate, isValidProjectUser, (req, res) => {
    const { id } = req.params;
    const authorized = req.validUser;

    if (authorized) {
      Tag.find({ project: id })
        .then(tags => {
          sendRes(res, '200', tags);
        })
        .catch(err => {
          sendErr(
            res,
            err,
            `The tags for project ${id} could not be retrieved.`
          );
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .put('/:id', authenticate, isValidProjectUser, (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    const authorized = req.validUser;
    const options = {
      new: true,
      runValidators: true
    };

    if(authorized){
      Project.findByIdAndUpdate(id, updatedProject, options)
        .populate('members', { firstName: 1, lastName: 1 })
        .select({ title: 1, description: 1, members: 1 })
        .then(updatedProject => {
          sendRes(res, '200', updatedProject);
        })
        .catch(err => {
          sendErr(res, err, `The project with id ${id} could not be modified.`);
        });
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  })
  .delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Project.findByIdAndRemove(id)
      .then(deletedProject => {
        sendRes(
          res,
          '200',
          deletedProject ? { _id: deletedProject._id } : null
        );
      })
      .catch(err => {
        sendErr(res, err, `The project with id ${id} could not be removed.`);
      });
  });

module.exports = {
  projectsRouter: router
};