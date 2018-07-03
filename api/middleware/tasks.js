// {
//   "project": "5b35c93a04378a66dba8d1a3",
//     "title": "Model data"
// }

const Project = require('../models/Project');

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
  getProjects: getProjects
};
