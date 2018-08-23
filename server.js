// express
const express = require('express');
const server = express();
// routes
const usersRoutes = require('./router/usersRouter');
const notesRoutes = require('./router/notesRouter');
const registerRoutes = require('./router/registerRouter');
const loginRoutes = require('./router/loginRouter');
// middleware
const errors = require('./middleware/errors');
// turn on cors
// const cors = require('cors');
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// server.use(
//   cors({
//     origin: 'https://killernotes-wtsteyykyx.now.sh/',
//     credentials: true,
//   }),
// );

server.use(express.json());
const PORT = process.env.PORT || 3007;

// base endpoints here
server.get('/', (req, res) => {
  res.send('it is working...');
});

// API routes
server.use('/api/users', usersRoutes);
server.use('/api/notes', notesRoutes);
server.use('/api/register', registerRoutes);
server.use('/api/login', loginRoutes);

// error handling
server.use(errors);

// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

// true let's JEST run, false let's SERVER run
if (false) {
  module.exports = server;
} else {
  server.listen(
    PORT,
    console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
  );
}
