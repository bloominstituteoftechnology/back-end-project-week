const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
server.use(cors({}));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.json({ Message: 'Hello World' });
});

server.listen(3333, err => {
  if(err) console.log(err);
  console.log('API connected on 3333');
})