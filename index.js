const express = require('express');
const helmet = require('helmet');
const server = express();

const routes = require('./api/routes.js')

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN Backend server is running."})
})

server.use('/api/', routes);

const port = process.env.PORT || 3300; 

server.listen(port, () => {console.log(`\n == Server running on ${port} ==\n`)});