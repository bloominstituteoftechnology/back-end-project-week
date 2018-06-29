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
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    } else {
      req.tokenPayload = decodedToken;
      next();
    }
  });
};

const isValidProjectUser = (req, res, next) => {
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
      req.projectAdmin = project.createdBy.toString() === currentUser;
      next();
    })
    .catch(err => {
      req.projectAdmin = false;
      next();
    });
};

module.exports = {
  generateToken: generateToken,
  authenticate: authenticate,
  isValidProjectUser: isValidProjectUser,
  isProjectAdmin: isProjectAdmin
};
