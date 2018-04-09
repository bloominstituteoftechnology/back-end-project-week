const mongoose = require('mongoose');
const server = require('./server');

const port = 3000

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/note-mate', {}, err => {
    if (err) throw new Error(err);
    console.log('Database connected')
});

server.listen(port, () => {
    console.log(`What's done is done. Now port ${port} has opened forever.`);
});