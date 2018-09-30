const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./data/helpers/notesDb');
const cors = require('cors');
require('dotenv').load();

const userRoutes = require('./Routes/userRoutes');
const noteRoutes = require('./Routes/noteRoutes');


const server = express();

//server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use(helmet());
server.use(cors({origin: true}));


server.get('/', (req,res) => {
	res.send("Welcome to lambda notes..testing...");
});


server.use('/api/users', userRoutes);
server.use('/api/notes', noteRoutes);



server.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`=== API is listening at ${port} ===`);
})


