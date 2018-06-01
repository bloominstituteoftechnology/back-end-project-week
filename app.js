const mongoose = require('mongoose');
const server = require('./server');

const port = process.env.PORT || 3333;

mongoose.connect('mongodb://localhost/notes').then(() => {
    console.log('connected to production database');
}).catch(err => {
    console.log('Error connection to production database')
})

server.listen(port, () => {
    console.log(`Magic is happening on port ${port}`)
})