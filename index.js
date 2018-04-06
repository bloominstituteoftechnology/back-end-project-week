const { server } = require('./Server/Server');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const { port } = requre('./config');

server.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Notes')

server.listen(PORT => {
    console.log(`Server is running on port ${PORT}`)
});

module.exports = server;


