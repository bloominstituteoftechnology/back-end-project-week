const config = require('./api/config');
const server = require('./server');

const port = config.port;
console.log(port);

server.listen(port, err => {
  console.log(`The server is up and running...!!!`);
});
