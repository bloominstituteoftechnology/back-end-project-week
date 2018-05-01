const express =  require('express'),
      mongoose = require('mongoose'),
      helmet = require('helmet'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      server = express()
      port = process.env.PORT || 5000;
      server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Running Sir' });
});

mongoose
  .connect('mongodb://localhost')
  .then(connected => {
    console.log('We Got Mongo Baby! :)');
  })
  .catch(err => {
    console.log('We DONT got Mongo Baby :(');
  });