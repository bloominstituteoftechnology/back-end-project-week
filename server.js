const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');

const routes = require('./routes/routes');

const corsOptions = {
  origin: 'http://kenny-lambdanotes.netlify.com',
  credentials: true
};

server.use(express.json());
server.use(cors(corsOptions));

mongoose.connect(
  'mongodb://kennington:123@dbh61.mlab.com:27617/lambdanotes',
  {},
  err => {
    if (err) return console.log(err);
    console.log('Connected to Mongo');
  }
);

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n===API running on http://localhost:${port}===\n`)
);

routes(server);

server.get('/', (req, res) => {
  res.send({ api: 'ε=ε=ε=ε=ε=ε=┌(;￣◇￣)┘' });
});

module.exports = { server };
