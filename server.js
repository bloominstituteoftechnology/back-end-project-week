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
const createNoteRouter = require('./setup/schemas/Note/createNoteRouter.js');
const findNotesRouter = require('./setup/schemas/Note/findNotesRouter.js');
const deleteNoteRouter = require('./setup/schemas/Note/deleteNoteRouter.js');
const updateNoteRouter = require('./setup/schemas/Note/updateNoteRouter.js');
// User
const registerUserRouter = require('./setup/schemas/User/registerUserRouter.js');
const loginUserRouter = require('./setup/schemas/User/loginUserRouter.js');

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
server.use('./api/login', loginUserRouter);

server.listen(PORT, () => console.log('API on port 5000'));
