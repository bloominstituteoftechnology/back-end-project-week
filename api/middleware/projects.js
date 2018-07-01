const Project = require('../models/Project');

const isProjectMember = (req, res, next) => {
  const projectId = req.params.id;
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

module.exports = {
  isProjectMember: isProjectMember,
  isProjectAdmin: isProjectAdmin,
  getProjectAdmin: getProjectAdmin
};
