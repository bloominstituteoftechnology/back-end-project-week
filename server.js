const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const noteRoutes = require('./serverRoutes/noteRoutes');

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

//Error handler
server.use((error, req, res, next) => {
    return res.status(error.code).json({message: error.message, error: error.error})
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry this page doesn't exist.")
  })

const port=8000;
server.listen(port, () => {
    console.log(`=== API is listening at ${port} ===`);
})