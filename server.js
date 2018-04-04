const express = require('express');
const helmet = require('helmet');
const server = express();
const db = require('./db');
const noteRoutes = require('./api/routes/noteRoutes');
const userRoutes = require('./api/routes/userRoutes');

const port = process.env.PORT || 3040;

server.use(helmet());
server.use(express.json());

// Adding Headers for requests.
server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use('/api/note', noteRoutes);
server.use('/api/user', userRoutes);

db.connectTo()
    .then(() => console.log('\n... API Connected to Database ...\n'))
    .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
});
