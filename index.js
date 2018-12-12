require('dotenv').config(); // load the .env file content

const server = require('./api/server.js');
const port = process.env.PORT || 9000;

server.listen(port, () =>
  console.log(`\n** welcome to the server running on ${port} **\n`)
);
