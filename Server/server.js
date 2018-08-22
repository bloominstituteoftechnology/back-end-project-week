const express = require('express');
const apiRoutes = require('./apiRoutes/apiRoutes');
const cors = require("cors");


const server = express();
server.use(cors());

server.use(express.json());
server.use('/api', apiRoutes);

const port = 8000;
server.listen(port, () => console.log(`\n=== API running on ${port} ===\n`));