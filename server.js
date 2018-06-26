const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const config = require('./config.js');
const { dbuser, dbpassword, dbname } = config.secret;
const server = express();

const port = process.env.PORT || 5000;

// Router
const noteRouter = require('./note/noteRouter.js');
const userRouter = require('./user/userRouter.js');
const tagRouter = require('./tag/tagRouter.js');

// Connect to mlab
mongoose
    .connect(`mongodb://${dbuser}:${encodeURIComponent(dbpassword)}@ds117711.mlab.com:17711/${dbname}`)
    .then(() => {
        console.log('Database is connected');
    })
    .catch(err => {
        console.log('error connecting to dev database:', err);
    });

// Api calls
server.use(helmet());
server.use(express.json());

server.use('/api/note', noteRouter);
server.use('/api/user', userRouter);
server.use('/api/tag', tagRouter);

server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
});

