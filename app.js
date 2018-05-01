const config = require('./api/config');
const server = require('./server');

const port = config.port;
console.log(port);
server.get('/', (req, res) => {
  res.json('API is running ok!');
});

server.listen(port, err => {
  console.log(`The server is up and running on ${port}...!!!`);
});
