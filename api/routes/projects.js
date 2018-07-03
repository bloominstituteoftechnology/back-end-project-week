const router = require('express').Router();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Tag = require('../models/Tag');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { authenticate } = require('../middleware/authentication');
const { getProjectAdmin } = require('../middleware/getters');
const {
  isProjectAdmin,
  isProjectMember
} = require('../middleware/permissions');

router
  .post('/', authenticate, (req, res) => {
    const { title, description, members } = req.body;
    const admin = req.tokenPayload.userid;
    const memberList = members ? members : [];

    if (!memberList.includes(admin)) memberList.push(admin);

    const newProject = {
      title: title,
      description: description,
      members: memberList,
      admin: admin
    };

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
        if (project.isMember(currentUser)) {
          sendRes(res, '200', project);
        } else {
          sendErr(res, '403', 'User is not authorized to perform this action.');
        }
      })
      .catch(err => {
        sendErr(res, err, `The project with id ${id} could not be retrieved.`);
      });
  })
  .get('/:id/tags', authenticate, isProjectMember, (req, res) => {
    const { id } = req.params;
    const authorized = req.validMember;

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
  .put('/:id', authenticate, isProjectMember, getProjectAdmin, (req, res) => {
    const { id } = req.params;
    const { title, description, members, admin } = req.body;
    const authorized = req.validMember;
    const updatedProject = { title, description, members };
    const options = {
      new: true,
      runValidators: true
    };

    if (admin) {
      return sendErr(res, '403', 'User cannot reassign project admin.');
    }

    if (!members.includes(req.admin)) {
      return sendErr(
        res,
        '403',
        'User cannot remove project admin from members.'
      );
    }

    if (authorized) {
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
  .delete('/:id', authenticate, isProjectAdmin, (req, res) => {
    const { id } = req.params;
    const authorized = req.projectAdmin;

    if (authorized) {
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
    } else {
      sendErr(res, '403', 'User is not authorized to perform this action.');
    }
  });

module.exports = {
  projectsRouter: router
};
