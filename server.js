const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cool = require('cool-ascii-faces');
const mongoose = require('mongoose');
const port = process.env.PORT || 5500;

mongoose
    .connect('mongodb://localhost/notesDb')
    .then(() => console.log('\n=== connected to mongo ===\n'))
    .catch(err => console.log('error connecting to mongo'));

const server = express();
const myNoteRoutes = require('./Notes/noteRoutes')

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/notes/', myNoteRoutes)


// ----- tests --------------------------------------------------------------
server.get('/', function (req, res) {
  res.send( 'Wahgwan! From di serva');
})
server.get('/coolfaces',(req, res) => {
    res.send(cool());
})
server.get('/jeff', (req, res) => {
    res.send('hai mai name is jeffff')
})
// ----- tests ---------------------------------------------------------------


server.listen(port, function () {
  console.log('Yuh serva listenin pon port 5500!');
});

