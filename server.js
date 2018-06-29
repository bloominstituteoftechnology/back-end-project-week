require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRouter = require('./Routes/noteRouter');
const studentRouter = require('./Routes/studentRouter');
const localHost = 'localhost:27017';
const database = 'lambdanotesdb';
const server = express();
const port = process.env.PORT || 5555;

const corsOptions = {
    origin: 'https://lambda-notes-kolumbic.herokuapp.com', 
    credentials: true
}

mongoose
    //.connect(`mongodb://${localHost}/${database}`) // local mongo instance
    .connect('mongodb://admin:DBjack1@ds018238.mlab.com:18238/lambda-notes') // mlab DB
    .then(response => {
        console.log("Connection Successful")
    })
    .catch(error => {
        console.log("Connection Failed")
    });

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());
server.use('/api/notes', noteRouter);
server.use('/students/', studentRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});
  
server.listen(port, () => console.log(`API running on port: ${port}`));
