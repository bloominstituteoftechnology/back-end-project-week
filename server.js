const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose');
const server = express();

const port = process.env.PORT || 5000;

// Serve static files from the React app
server.use(express.static(__dirname + '/client/build'));

// Router
const noteRouter = require('./note/noteRouter.js');
const userRouter = require('./user/userRouter.js');
const tagRouter = require('./tag/tagRouter.js');

// Connect to mlab
if (process.env.NODE_ENV === 'dev') {
    const config = require('./config.js');
    const { dbuser, dbpassword, dbname } = config.secret;
    mongoose
        .connect(`mongodb://${dbuser}:${encodeURIComponent(dbpassword)}@ds117711.mlab.com:17711/${dbname}`)
        .then(() => {
            console.log('Database is connected');
        })
        .catch(err => {
            console.log('error connecting to dev database:', err);
        });
} else {
    mongoose
        .connect(process.env.mongo)
        .then(() => {
            console.log('Database is connected');
        })
        .catch(err => {
            console.log('error connecting to dev database:', err);
        });
}

// Api calls
server.use(helmet());
server.use(express.json());

server.use('/api/note', noteRouter);
server.use('/api/user', userRouter);
server.use('/api/tag', tagRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
});

