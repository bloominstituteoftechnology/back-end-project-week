const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3333;
const server = express();

server.unsubscribe(cors({}));
server.unsubscribe(express.json());

server.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

server.listen(port, err => {
  if(err) console.log(err);
  console.log(`Magic happening on ${port}`);
});