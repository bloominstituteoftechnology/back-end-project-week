const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors({}));

server.get('/', (req, res) => {
  res.json({Message: 'API is working!'})
})

const port = process.env.port || 3333;

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}`);
});
