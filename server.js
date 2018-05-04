const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./User/User.js');

const PORT = process.env.PORT || 5000;

const server = express();

//use middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(morgan('dev'));

server.use(
    session({
        secret: process.env.SECRET || require('./config').secret,
        cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
        secure: false,
        httpOnly: true,
        name: 'lambda-notes',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 10 * 60 //seconds
        })
    })
);

const dbCred = {
    dbUser: process.env.DB_USER || require('./config').username,
    dbPassword: process.env.DB_PASSWORD || require('./config').password
};

const setUpRoutes = require('./routes')(server);

server.get('/', (req, res) => {
    res.json({api:'running'});
});

mongoose
    .connect(`mongodb://${dbCred.dbUser}:${dbCred.dbPassword}@ds215380.mlab.com:15380/bewdb`)
    .then(response => {
        console.log('\n===Connected to DB===\n');
    })
    .catch(err => {
        console.log('Error connecting to DB');
    });

server.listen(PORT, () => {
    console.log('Connected to Server');
});