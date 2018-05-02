const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

mongoose.connect('mongodb://dbh61.mlab.com:27617/lambdanotes', {}, err => {
  if (err) return console.log(err);
  console.log('\n===Connected to MLAB database===\n');
});

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) =>
  res.send('API Running... ε=ε=ε=ε=ε=ε=┌(;￣◇￣)┘')
);

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n===API running on http://localhost:${port}===\n`)
);
