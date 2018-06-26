const router = require('express').Router();
const Project = require('../models/Project');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
.post('/', (req, res) => {});
// .get('/', (req, res) => {})
// .get('/:id', (req, res) => {})
// .update('/:id', (req, res) => {})
// .delete('/:id', (req, res) => {});

module.exports = {
  projectsRouter: router
};
