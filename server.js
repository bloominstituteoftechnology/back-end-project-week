const server = require('express')();
const swaggerUi = require('swagger-ui-express');
const { projectsRouter } = require('./api/routes/projects');
const { tasksRouter } = require('./api/routes/tasks');
const { usersRouter } = require('./api/routes/users');
const swaggerDocs = require('./api/docs/swagger.json');

server.use(require('express').json());

server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/users', usersRouter);
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.get('/', (req, res) => {
  res.status(200).send('Lambda Notes API');
});

module.exports = {
  server
};
