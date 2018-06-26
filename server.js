const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const { projectsRouter } = require('./api/routes/projects');
const { tasksRouter } = require('./api/routes/tasks');
const { usersRouter } = require('./api/routes/users');
const swaggerDocs = require('./api/docs/swagger.json');

const server = express();

// Middleware
server.use(express.json());

// API Routes
server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/users', usersRouter);
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
server.get('/api', (req, res) => {
  res.status(200).send('Lambda Notes API');
});

// UI Production Routing
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
  // server.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });
}

module.exports = {
  server
};
