// npm or yarn init -y
// 

const express = require('express');
// const session = require('express-session');
// const helmet = resuire('helmet');
const mongoose = require('mongoose');
const server = express();
// const cors = require('cors');

// const routes = require('./routes/routes');

// const corsOptions = {
//   origin: 'http://kenny-lambdanotes.netlify.com',
//   credentials: true
// };

server.use(express.json());
// server.use(cors(corsOptions));

const uri = 'mongodb://amanda:amanda@ds133550.mlab.com:33550/lambdanotes-backend'
mongoose
  .connect(uri)
  .then(() => console.log('Connected to Mongo'))
  .catch((err) => console.log(err))

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(`\n API running on ${port}`)
);

// routes(server);

server.get('/', (req, res) => {
  res.send({ API: 'Running' });
});

module.exports = { server };