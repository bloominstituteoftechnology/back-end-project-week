const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const server = express();

mongoose
  .connect(`mongodb://localhost/notes`)
  .then(() => console.log(`API connected...MongoDB connected...`))
  .catch(() => console.log(`Connection to API failed`));

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.status(200).json({ status: 'API running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
