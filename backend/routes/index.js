const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(express.json());
// server.use(cors());
server.use(morgan('dev'));

const errorHandler = require('./handlers');
const apiHandlers = require('./api')

server.use('/api/', apiHandlers)


server.use((req, res, next) => {
    let error = new Error("error couldnt be found")
    error.status = 404;
    next(error)
})
server.use(errorHandler.error)

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
    console.log(`API is running at port ${PORT}`)
})