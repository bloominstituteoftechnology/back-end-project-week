const mongoose = require('mongoose');
const server = require('./server');
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {}, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('\n\n--Connected to the Database Successfully--\n\n');
})

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`\n\n--Server rolling and chilling on port ${port} with y'all--\n\n`);
});