const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 2121;

const server = express();
server.use(cors({}));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.json({ Message: 'Any requests?' });
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log('>o0o0o spinning vinyls on 2121');
});
