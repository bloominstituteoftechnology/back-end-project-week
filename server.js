const loginRouter = require('./User/loginRouter');
const logoutRouter = require('./User/logoutRouter');
const registerRouter = require('./User/registerRouter');
const getNotesRouter = require('./Note/getNotesRouter');
const newNoteRouter = require('./Note/newNoteRouter');
const updateNoteRouter = require('./Note/updateNoteRouter');
const destroyNoteRouter = require('./Note/destroyNoteRouter');

const config = require('./secrets/config');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ message: 'API running successfully! YAY!' });
});

server.use('/api/login', loginRouter);
server.use('/api/logout', logoutRouter);
server.use('/api/register', registerRouter);
server.use('/api/getnotes', getNotesRouter);
server.use('/api/newnote', newNoteRouter);
server.use('/api/updatenote', updateNoteRouter);
server.use('/api/destroynote', destroyNoteRouter);

mongoose
  .connect(config.database)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log('Error connecting to DB', err);
  });

const port = process.env.PORT || 5000;

server.listen(port, err => {
  console.log(`connected to the server port ${port}`);
});
