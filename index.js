const express = require('express');
const server = express();

const db = require("./data/db")

server.use(express.json());

const port = 8000;






server.listen(port, () => { console.log(`Server is running on port ${port}`)});
