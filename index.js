const server = require('./server');
// const config = require('./config.json');
const port = 3030;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes', () => {
    console.log('connected to mongo');
});

server.listen(port, () => {
    console.log(`Server iz running on port ${port}`)
});