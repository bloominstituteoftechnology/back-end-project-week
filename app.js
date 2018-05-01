const mongoose = require('mongoose');
const server = require('./server');
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://Habib:lambdaNotes@ds163769.mlab.com:63769/heroku_rkr8x6jp', {}, (error) => {
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