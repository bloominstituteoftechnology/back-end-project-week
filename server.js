const server = require('express')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./api/docs/swagger.json');

server.get('/', (req, res) => {
  res.status(200).send('Lambda Notes API');
});

server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = {
  server
}