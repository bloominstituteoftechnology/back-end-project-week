const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./api/Routes/Routes');

const server = express();

const corsOptions = {
  origin: 'https://angry-northcutt-d02a71.netlify.com',
  credentials: true,
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('\n=== Connected to mongo ===\n');
  })
  .catch(err => {
    console.log(err);
  });

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());

routes(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
