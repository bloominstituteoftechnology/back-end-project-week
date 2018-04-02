const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const server = express();

const PORT = 5000;

server.listen(PORT);
server.use(express.json());

console.log("Server listening on: ", PORT)
console.log("Hello World!");

// eventually will store all routes in another file, once they are all built.
// routes(server);