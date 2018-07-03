const Project = require('../models/Project');
const Task = require('../models/Task');
const { sendErr } = require('../utils/apiResponses');

const isProjectAdmin = (req, res, next) => {
  const projectId = req.params.id;
  const currentUser = req.tokenPayload.userid;

  Project.findById(projectId)
    .then(project => {
      req.projectAdmin = project.admin.toString() === currentUser;
      next();
    })
    .catch(err => {
      req.projectAdmin = false;
      next();
    });
};

const isProjectMember = (req, res, next) => {
  const projectId = req.body.project || req.params.id;
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

module.exports = {
  isProjectAdmin: isProjectAdmin,
  isProjectMember: isProjectMember,
  isTaskAccessible: isTaskAccessible
};
