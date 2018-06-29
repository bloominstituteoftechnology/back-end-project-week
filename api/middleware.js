require('dotenv').config();

const jwt = require('jsonwebtoken');
const Project = require('./models/Project');

const generateToken = payload => {
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.replace(/^Bearer /, '');

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    console.log('error', error);
    if (error) {
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    } else {
      req.tokenPayload = decodedToken;
      next();
    }
  });
};

const isProjectUser = (req, res, next) => {
  const projectId = req.params.id;
  const currentUser = req.tokenPayload.userid;

  Project.findById(projectId)
    .then(project => {
      req.validUser = project.isValidUser(currentUser);
      next();
    })
    .catch(err => {
      req.validUser = false;
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
  generateToken: generateToken,
  authenticate: authenticate,
  isProjectUser: isProjectUser,
  isProjectAdmin: isProjectAdmin,
  getProjectAdmin: getProjectAdmin
};
