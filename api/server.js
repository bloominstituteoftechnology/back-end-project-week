const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const UserRoutes = require('./users/UserRoutes');
const User = require('./users/User');
const Notes = require('./notes/Notes');

const port = 5000;

const server = express();

server.use(cors());
server.use(express.json());







if (process.env.NODE_ENV !== 'test') {
    server.listen(5000, () => console.log('running on port 5000'));
    mongoose.connect('mongodb://localhost/Backend')
        .then(() => console.log('connected to MongoDB'))
        .catch(err => console.log('ERROR connecting to MongoDB'));
}



server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

// server.listen(port, () => {
//     console.log(`server on port ${port}`);
// });


module.exports = server;