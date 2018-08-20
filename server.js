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

const port = process.env.PORT || 8888;
server.listen(port, () => console.log("Node-Express API running on process.env.PORT || 8888. . ."));