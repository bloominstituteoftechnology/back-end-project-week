const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3333;

const routes = require('./routes/routes');

const server = express();

server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, 'client/build')));

server.use(routes);

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://gakko:1234@ds121099.mlab.com:21099/notes')
  .then(r => {
    console.log('Successfully connected to the notes database');
  })
  .catch(err => {
    console.error(err);
  });

// server.get('/', (req, res) => {
//   res.send({ message: 'API running' })
// })

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
