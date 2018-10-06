const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./data/helpers/notesDb');
const cors = require('cors');
require('dotenv').load();

const userRoutes = require('./Routes/userRoutes');
const noteRoutes = require('./Routes/noteRoutes');

const server = express();

//server.use(cors())
server.use(express.json());
server.use(morgan('dev'));

server.use(helmet());
server.use(cors({origin: true}));

server.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "https://fervent-borg-1591ca.netlify.com");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


server.get('/', (req,res) => {
	res.send("Welcome to lambda notes..testing...");
});


server.use('/api/users', userRoutes);
server.use('/api/notes', noteRoutes);


server.use(function(req, res) {
  res.status(404).send("Wrong URL. This page does not exist");
});


const port = process.env.PORT || process.env.REACT_APP_PORT;

server.listen(port, () => {
    console.log(`=== API is listening at ${port} ===`);
})


