const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

server.use(express.json());
server.use(cors());
server.use(helmet());

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n server listening on port ${port}`));

server.get('/', (req, res) => {
  res.status(200).send("a ok");
});
