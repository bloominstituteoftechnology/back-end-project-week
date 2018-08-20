const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(morgan('server'));
server.use(helmet());
server.use(cors({origin: true}));

//Error handler
server.use((error, req, res, next) => {
    return res.status(error.code).json({message: error.message, error: error.error})
})

const port=8000;
server.listen(port, () => {
    console.log(`=== API is listening at ${port} ===`);
})