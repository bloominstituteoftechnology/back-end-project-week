const express = require('express');
const server = express();

const notesRouter = require('./routers/notes');

server.use(express.json())

server.use('/notes', notesRouter)

server.listen(8000, () => {
    console.log('===API===')
})