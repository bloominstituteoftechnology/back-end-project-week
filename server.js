require('dotenv').config();
const express = require('express');
const apiRoutes = require('./api/apiRoutes');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.get('/', (req, res) => {
    res.send('API is running!');
});

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api', apiRoutes);
server.use(errorHandler);

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n== API up on port ${port} ==\n`));