const express = require('express');
const server = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config.json');

const userRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const { authUser, sendUserError } = require('./middleware');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(`mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds135399.mlab.com:35399/lambda-notes`, () => {
    console.log('connected to mongo');
});
server.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

const corsOptions = {
    origin: ["https://distracted-kepler-8e6505.netlify.com", "http://localhost:3000"],
    credentials: true
  };

server.use(cookieParser());
server.use(cors(corsOptions));
server.use(express.json());

server.options('*', cors());
server.use('/users', userRouter);
server.use('/notes', authUser, notesRouter);

server.get('/', (req, res) => {
    res.send('works');
});

module.exports = server;