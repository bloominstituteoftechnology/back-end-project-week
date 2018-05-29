const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000
server = express();

server.use(express.json());
server.use(cors({}));

server.get('/', (req, res) => {
  res.json({Message: 'Hello World'});
});

server.listen(port, () => {
  console.log(`Magic happening on ${port}`);
});