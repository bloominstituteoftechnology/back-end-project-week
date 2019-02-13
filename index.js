const express = require('express');

const server = express();

server.use(express.json());

const PORT = 2200;



server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});