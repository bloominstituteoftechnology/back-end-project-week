const express = require('express');

const server = express();
const PORT = 5000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

server.use((req, res, next) => {
    next();
});

server.use(express.json());

server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`)
    }
});