const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// const PORT = 5000;

// ========== MIDDLEWARE ============== //

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// ======== ROUTER requires ======== //
// Note
const createNoteRouter = require('./Note/createNoteRouter.js');
const findNotesRouter = require('./Note/findNotesRouter.js');
const deleteNoteRouter = require('./Note/deleteNoteRouter.js');
const updateNoteRouter = require('./Note/updateNoteRouter.js');
// User
const registerUserRouter = require('./User/registerUserRouter.js');
const loginUserRouter = require('./User/loginUserRouter.js');
const findUsersRouter = require('./User/findUsersRouter.js');
const deleteUserRouter = require('./User/deleteUserRouter.js');
const updateUserRouter = require('./User/updateUserRouter.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

mongoose
  .connect(
    'mongodb://pacManKana:LambdaN0t3s@ds111050.mlab.com:11050/lambda-notes'
  )
  .then(cnn => {
    console.log('\n=== connected to mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });

// ========== ROUTES ========== //

server.get('/', function(req, res) {
  res.send({ api: 'up and running' });
});

// const setupRoutes = require('./setup/routes')(server);

// ======== ROUTERS .use ========== //
// Note
server.use('/api/createnote', createNoteRouter);
server.use('/api/viewnotes', findNotesRouter);
server.use('/api/deletenote', deleteNoteRouter);
server.use('/api/updatenote', updateNoteRouter);
// User
server.use('/api/register', registerUserRouter);
server.use('/api/login', loginUserRouter);
server.use('/api/viewusers', findUsersRouter);
server.use('/api/deleteuser', deleteUserRouter);
server.use('/api/updateuser', updateUserRouter);

server.listen(PORT, () => console.log('API on port 5000'));
