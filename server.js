const express = require('express');
const cors = require('cors');
const port = '5000';

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ message: `The api is running on port ${port}`});
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`\n=== API running on port ${port}==`);
});