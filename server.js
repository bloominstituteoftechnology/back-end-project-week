require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();

const notesRouter = require('./routers/notes');

server.use(express.json());
server.use(cors());

server.use('/notes', notesRouter)

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log('===API===')
})

