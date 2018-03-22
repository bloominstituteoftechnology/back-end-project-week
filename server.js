const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

const BCRYPT_COST = 11

const server = express();

server.use(bodyParser.json());
server.use(
    session({
        secret: 'aQU1DALYsUniWbkS3L8OWBOWgzEKEtBj0oWTkFyXBe6hWzIJlK'
    })
);

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

server.use(cors(corsOptions));