const server = require('./server.js');
const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes', () => {
    console.log('connected to mongo');
});

server.listen(config.PORT, () => {
    console.log(`Server is running at port ${config.PORT}`);
});