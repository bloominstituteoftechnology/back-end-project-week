const Project = require('../models/Project');

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

module.exports = {
  getProjects: getProjects,
  getProjectAdmin: getProjectAdmin
};
