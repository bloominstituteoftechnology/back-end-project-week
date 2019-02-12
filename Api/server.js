const express = require('express');
const server = express();
const cors = require('cors');
const PORT = 4050;

server.use(
    express.json(),
    cors(),
    )















server.listen(PORT, ()=> {
    console.log(`Listening on ${PORT}`)
})



