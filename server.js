const express = require('express');
const helmet = require('helmet');
const server = express();
const db = require('./db');
const noteRoutes = require('./api/routes/noteRoutes');
const port = process.env.PORT || 3030;

server.use(helmet());
server.use(express.json());

server.use('/api/note', noteRoutes);

db.connectTo()
    .then(() => console.log('\n... API Connected to Database ...\n'))
    .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
});
