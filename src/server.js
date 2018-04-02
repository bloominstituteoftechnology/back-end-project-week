const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const server = express();

server.use(express.json());

// eventually will store all routes in another file, once they are all built.
// routes(server);