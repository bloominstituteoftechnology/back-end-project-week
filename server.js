const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const db = require('knex')(require('./knexfile').development);
const HttpError = require('./utils/HttpError');

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.get(process.env.PATH_GET_NOTES, (req, res, next) => {
  db('notes')
    .select()
    .then(notes => res.status(200).json(notes))
    .catch(err => next(new HttpError(404, 'Database did not supply requested resources.')));
});

server.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const { code, message } = HttpError;
    console.log(HttpError);
    return res.status(code).json({ message });
  }
  return res.status(404).json('The requested resource could not be found.');
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
  });
}

module.exports = server;
