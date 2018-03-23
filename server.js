require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');

const PORT = process.env.PORT || 5000;
const server = express();
server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, 'client', 'build')));

mongoose.connect(
    process.env.MONGODB_URI ||
        'mongodb://<dbuser>:<dbpassword>@ds121999.mlab.com:21999/lambdanotes'
);

routes(server);

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

server.listen(PORT, err => {
    if (err) {
        console.log(`Server not running`, err);
    } else {
        console.log(`Server is running.`);
    }
});
