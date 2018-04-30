const mongoose = require('mongoose');
const server = require('./server');
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/backEnd', {}, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('\n\n--Connected to the Database Successfully--\n\n');
})

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`\n\n--Server running on port ${port} --\n\n`);
});