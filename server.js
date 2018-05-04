const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongoose
//   .connect('mongodb://localhost/notesdb')
//   .then(() => console.log('\n=== connected to mongo ===\n'))
//   .catch(err => console.log('database is not connected'));

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running good' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
