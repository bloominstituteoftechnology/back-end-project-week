const express = require('express');
const helmet = require('helmet');

const server = express();
const port = 8000;

server.use(express.json());
server.use(helmet());


server.get('/', (req, res) => {
  res.send('API Running...');
});


server.listen(port, () => console.log(`~~ Listening on Port ${port} ~~`));
