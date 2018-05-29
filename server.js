const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose')
const cors = require('cors');

const server = express();
server.use(cors({}));
server.use(express.json());

mongoose
  .connect('mongodb://localhost/Notes')
  .then(conn => {
    console.log('\n=== Connected to Mongo Notes! ===\n');
  })
  .catch(err => console.log('error connecting to mongo', err));

server.get('/', (req, res) => {
    res.json({ Message: 'Oh hai there'})
});

const port = process.env.PORT || 3333;
server.listen(port, () => {
    console.log(`\n\n THUNDER CATS ARE GO ON http://localhost:${port}!!!`)
});