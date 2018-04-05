const express = require('express');
const session = require('express-session');
const config = require('config.js')
const cors = require('cors');

const corOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const PORT = 5000;
const server = express();

server.use(express.json());
server.use(cors(corOptions));
server.use(session({
  secret: 'mBXuM9c1iMqwdzYClsGj7qAHVJKVi5YS',
  resave: true,
  saveUninitialized: false,
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/noteSchema');

server.get('/', (req, res) => {
  noteSchema.find({}, (err, database) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(database);
    }
  });
});


routes(server);

server.listen(PORT, err => {
  if (err) {
    console.log('Server error', err);
  } else {
    console.log(`The server is listening on port: ${PORT}.`);
  }
});

module.exports = { server, };