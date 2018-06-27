const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const { projectsRouter } = require('./api/routes/projects');
const { tasksRouter } = require('./api/routes/tasks');
const { usersRouter } = require('./api/routes/users');

const server = express();
const apiDoc = yamljs.load('./api/docs/index.yaml');
const apiDocOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Lambda Notes API Documentation'
};

// Middleware
server.use(express.json());

// Serve static files
// server.use(express.static(path.resolve(__dirname, 'client/build')));

// API Routes
server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/users', usersRouter);
server.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(apiDoc, apiDocOptions)
);
server.get('/api', (req, res) => {
  res.status(200).send('Lambda Notes API');
});
// server.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
// });

module.exports = {
  server
};
