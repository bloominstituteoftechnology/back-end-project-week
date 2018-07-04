const Project = require('../models/Project');
const Subtask = require('../models/Subtask');
const Comment = require('../models/Comment');
const Tag = require('../models/Tag');
const { sendErr } = require('../utils/apiResponses');

const getProjectByTag = (req, res, next) => {
  const tagId = req.params.id;

  Tag.findById(tagId)
    .then(tag => {
      req.project = tag.project;
      next();
    })
    .catch(err => {
      sendErr(res, err, `The tag with id ${tagId} could not be retrieved.`);
    });
};

const getProjects = (req, res, next) => {
  const currentUser = req.tokenPayload.userid;

  Project.find({ members: currentUser })
    .then(projects => {
      req.projects = projects.map(project => project._id);
      next();
    })
    .catch(err => {
      req.projects = [];
      next();
    });
};

const getProjectAdmin = (req, res, next) => {
  const projectId = req.params.id;

  Project.findById(projectId)
    .then(project => {
      req.admin = project.admin.toString();
      next();
    })
    .catch(err => {
      req.admin = null;
      next();
    });
};

const getTaskBySubtask = (req, res, next) => {
  const subtaskId = req.params.id;

  Subtask.findById(subtaskId)
    .then(subtask => {
      req.task = subtask.task;
      next();
    })
    .catch(err => {
      sendErr(
        res,
        err,
        `The subtask with id ${subtaskId} could not be retrieved.`
      );
    });
};

const getTaskByComment = (req, res, next) => {
  const commentId = req.params.id;

  Comment.findById(commentId)
    .then(comment => {
      req.task = comment.task;
      next();
    })
    .catch(err => {
      sendErr(
        res,
        err,
        `The subtask with id ${commentId} could not be retrieved.`
      );
    });
};

module.exports = {
  getProjectByTag: getProjectByTag,
  getProjects: getProjects,
  getProjectAdmin: getProjectAdmin,
  getTaskByComment: getTaskByComment,
  getTaskBySubtask: getTaskBySubtask
};
