const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ hello: "world", project: "back-end-project" });
})

// GET | Return stored notes

// server.get('/notes', (req, res) => {
//   res.status
// })

server.listen(8888, () => console.log("Node-Express API running on port 8888. . ."));