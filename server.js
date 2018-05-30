const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ message: `Are you supposed to be here?`});
});

mongoose
  .connect('mongodb://localhost/Back-End-Project')
  .then(() => console.log('\n=== Successfully connected to MongoDB ==='))
  .catch(err => console.log('\n=== Error connecting to MongoDB ==='));

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`\n=== API running on port ${port} ===`);
});