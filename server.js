const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3000;
const corsOptions = {
    "methods": "GET, PUT, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

const server  = express();
server.use(express.json());
server.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notes', () => {
    console.log('MongoDB Running')
});

const routes = require('./back-end/routes/index');
routes(server);

server.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})