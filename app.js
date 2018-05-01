const mongoose = require('mongoose');

const server = require('./server');
const secrets = require('./secrets')

const port = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://runranron:${secrets.mongopw}@cluster0-h73bz.mongodb.net/test`, {}, err => {
    if (err) return console.log(err);
    console.log('DB Connection Achieved');
});

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Server rollin on ${port}`);
});