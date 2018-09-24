const express = require('express');

const server = express();


server.get('/', (req, res) => {
    res.send("Hello WOrld");
});


server.listen(8000, () => console.log("======API Running on Port 8000======="))