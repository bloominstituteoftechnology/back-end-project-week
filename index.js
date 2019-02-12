const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig');
const parser = express.json();
const server = express();
const PORT = 5050;
const logger = require('morgan');
const helmet = require('helmet');
const notesRouter = require('./routers/notesRouter');

server.use(express.json());
server.use(cors({}));
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());
server.use('/api/notes', notesRouter);




server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});
