const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3333;
const server = express();
server.use(cors({}));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.json({ Message: 'Hello World' });
});

server.listen(port, err => {
  if(err) console.log(err);
  console.log(`API connected on ${port}`);
})