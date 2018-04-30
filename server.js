const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');


mongoose
  .connect('mongodb://localhost/notesdb')
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('error connecting to mongo'));


// add your server code
const server = express();
server.use(helmet());
server.use(express.json());


server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
