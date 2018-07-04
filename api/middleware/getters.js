const Project = require('../models/Project');
const Subtask = require('../models/Subtask');
const { sendErr } = require('../utils/apiResponses');
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
      sendErr(res, err, `The subtask with id ${subtaskId} could not be retrieved.`);
    });
};

module.exports = {
  getProjects: getProjects,
  getProjectAdmin: getProjectAdmin,
  getTaskBySubtask: getTaskBySubtask
};
