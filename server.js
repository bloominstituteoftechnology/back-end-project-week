const express = require('express');
const cors = require('cors');

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors({}));

server.get('/', (req, res) => {
  res.json({Message: `Server listening on port ${port}`});
})

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`Server listening on port ${port}`);
})