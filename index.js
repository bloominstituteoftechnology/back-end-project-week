const mongoose = require('mongoose');

const server = require('./API/server');

const port = process.env.PORT || 5000;

mongoose 
    .connect("mongodb://localhost/lnotes")
    .then(() => {
        console.log(`\n *********** Connected to mongo DB *********** \n`);
        server.listen(port, () => {
            console.log(`\n *********** Connected to port ${port} *********** \n`);
        });
    })
    .catch(err => {
        console.log(`error connecting to db with the error:`, err);
    });