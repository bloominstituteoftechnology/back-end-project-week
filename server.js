// npm or yarn init -y
// 

const express = require('express');
// const session = require('express-session');
// const helmet = resquire('helmet');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// const routes = require('./routes/routes');

const corsOptions = {
  origin: 'https://amanda-lambdanotes.netlify.com',
  credentials: true
};

server.use(express.json());
server.use(cors(corsOptions));

const uri = 'mongodb://amanda:amanda@ds133550.mlab.com:33550/lambdanotes-backend'
mongoose
  .connect(uri)
  .then(() => console.log('Connected to Mongo'))
  .catch((err) => console.log(err))

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`\n API running on ${port}`);
});

// routes(server);

// server.get('/', (req, res) => {
//   res.send({ API: 'Running' });
// });

module.exports = { server };