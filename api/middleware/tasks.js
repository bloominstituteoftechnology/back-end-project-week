const Project = require('../models/Project');
const Task = require('../models/Task');
const { sendErr } = require('../utils/apiResponses');

const isProjectMember = (req, res, next) => {
  const projectId = req.body.project;
  const currentUser = req.tokenPayload.userid;

  Project.findById(projectId)
    .then(project => {
      req.validMember = project.isMember(currentUser);
      next();
    })
    .catch(err => {
      req.validMember = false;
      next();
    });
};

const isTaskAccessible = (req, res, next) => {
  const taskId = req.params.id;
  const currentUser = req.tokenPayload.userid;

  Task.findById(taskId)
    .populate('project')
    .then(task => {
      req.taskAccessible =
        task.project.members.filter(member => member.toString() === currentUser)
          .length === 1;
      next();
    })
    .catch(err => {
      sendErr(res, err, `The task with id ${taskId} could not be retrieved.`);
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

module.exports = {
  isProjectMember: isProjectMember,
  isTaskAccessible: isTaskAccessible,
  getProjects: getProjects
};
