const Project = require('../models/Project');

const isProjectMember = (req, res, next) => {
  const projectId = req.body.project;
  const currentUser = req.tokenPayload.userid;

  Project.findById(projectId)
    .then(project => {
      req.validMember = project.isValidUser(currentUser);
      next();
    })
    .catch(err => {
      req.validMember = false;
      next();
    });
};

module.exports = {
  isProjectMember: isProjectMember
};