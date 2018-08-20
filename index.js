const db = require('./data/db');
const express = require('express');
const server = express();
server.use(express.json());

const port = 5000;
server.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
