const mongoose = require('mongoose');
const server = ('./server');
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/backEnd', {}, (error) => {
    if (error) {
        console.log(eror, 'There was an error connecting to the database');
    }
    console.log('\n\n--Connected to the Database Successfully--\n\n');
});

server.listen(port, (error) => {
    if (error) {
        console.log(error, 'There was an error connecting to the server');
    }
    console.log(`\n\n--Server rolling and chilling on port ${port}.`);
});