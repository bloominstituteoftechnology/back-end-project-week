const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').load();

const noteRoutes = require('./serverRoutes/noteRoutes');
const userRoutes = require('./serverRoutes/userRoutes');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors({origin: true}));

server.get('/', (req, res) => {
    res.send('Welcome to Lambda Notes');
})

//Endpoints for Notes
server.use('/api/notes', noteRoutes);
server.use('/api/users', userRoutes);

//Error handler
server.use((error, req, res, next) => {
    return res.status(error.code).json({message: error.message, error: error.error})
})

server.use(function (req, res, next) {
    res.status(404).send("Sorry this page doesn't exist.")
  })

const port = process.env.PORT || process.env.REACT_APP_PORT;

server.listen(port, () => {
    console.log(`=== API is listening at ${port} ===`);
})