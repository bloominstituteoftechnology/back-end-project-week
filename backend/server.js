require('dotenv').config();
const express = require('express');
// const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


const server = express();
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const host = process.env.DB_HOST;
const success = process.env.STATUS_SUCCESS;

server.use(express.json());
server.use(morgan('combined'));
// server.use(helmet());

const corsOptions = {
  "origin": "http://localhost:3000",
  // "AllowedHeaders": ['Content-Type', 'Authorization', 'body'],
  "credentials": true,
  // "methods": ['GET', 'PUT', 'POST', 'DELETE']
};

// server.use((req, res, next) => {
//     next();
// }); // middleware if I need to add it later

server.use(cors(corsOptions));
server.use('/api/notes', noteRouter);
userRouter(server);

// server.get('/', cors(corsOptions), function(req, res) {
//   res.status(success).json({ api: 'running...' });
// });

mongoose
  .connect(`mongodb://${host}`)
  .then(conn => {
    console.log('\n\nConnected to Mongo');
  })
  .catch(err => {
    if (err) console.error(err);
  })


module.exports = { server };