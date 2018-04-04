const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');
const middleWare = require('./middlewares');
const cors = require('cors');

const User = require('./models/user-model');

const userRouter = require('./routes/user-router');


const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const corsOptions = {
    "origin": "http://localhost:3030",
    "credentials": true
};

const server = express();
server.use(express.json());
server.use(morgan('combined'));

server.use(
    session({
        secret:'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
        resave: true,
        saveUninitialized: false,
    }),
);

server.use(cors(corsOptions));
server.use(middleWare.restrictedPermissions);

/* ************ Routes ***************** */

server.use('/users', userRouter);
// server.use('/notes', authUser, notesRouter);

server.get('/', (req, res) => {
    res.send('API connected');
})



module.exports = server;