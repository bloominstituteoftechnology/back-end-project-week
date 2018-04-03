// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const port = process.env.PORT || 5000;
// const noteRouter = require('./api/routes/NoteRoutes');

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true
// };

// const server = express();
// server.use(express.json());
// server.use(cors(corsOptions));

// server.use('/api/notes', noteRouter);

// mongoose.connect('mongodb://localhost/lambda_notes')
//   .then(res => {
//     console.log('MongoDB Connected Successfully');
//   })
//   .catch(err => {
//     console.log('DB Connection failed');
//   });

// server.listen(port, (req, res) => {
//   console.log(`Server listening on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;

const routes = require('./api/routes/routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

const server = express();
server.use(express.json());
server.use(cors(corsOptions));

routes(server);

mongoose.connect('mongodb://localhost/lambda_notes')
  .then(res => {
    console.log('MongoDB Connected Successfully');
  })
  .catch(err => {
    console.log('DB Connection failed');
  });

server.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
