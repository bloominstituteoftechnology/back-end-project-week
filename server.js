// npm or yarn init -y

const express = require('express');
// const session = require('express-session');
const helmet = require('helmet');
// const cors = require('cors');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');

const server = express();

// const routes = require('./routes/routes');

// const corsOptions = {
//   origin: 'https://amanda-lambdanotes.herokuapp.com/',
//   credentials: true
// };

server.use(express.json());
server.use(helmet());
// server.use(cors(corsOptions));
server.use(bodyParser.json());

mongoose
  .connect('mongodb://amanda:amanda@ds133550.mlab.com:33550/lambdanotes-backend')
  .then(() => console.log('mLab Connected to Mongo'))
  .catch((err) => console.log(err))

// routes(server);

server.get('/', (req, res) => {
  res.send({ API: 'Running' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`API running on ${PORT}`)
);

// module.exports = { server };

// const express = require('express');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const cors = require('cors');

// const server = express();

// const corsOptions = {
//   origin: 'https://amanda-lambdanotes.herokuapp.com/',
//   credentials: true,
// };

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('\n=== Connected to Mongo ===\n');
//   })
//   .catch(err => {
//     console.log(err);
//   });

// server.use(cors(corsOptions));
// server.use(helmet());
// server.use(express.json());

// routes(server);

// const port = process.env.PORT || 5000;
// server.listen(port, () => {
//   console.log(`Server up and running on ${port}`);
// });