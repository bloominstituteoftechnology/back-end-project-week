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
        'mongodb://<dbuser>:<dbpassword>@ds123129.mlab.com:23129/heroku_lz76kll3'
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
