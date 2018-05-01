const config = require('./api/config');
const server = require('./server');

const port = config.port;

server.get('/', (req, res) => {
  console.log('delete me');
  res.json('API is okay');
});

server.listen(port, err => {
  console.log(`The server is up and running...!!!`);
});
