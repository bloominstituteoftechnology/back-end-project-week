const mongoose = require('mongoose');
const server = require('./server');
const secrets = require('./secrets')

const port = process.env.PORT || 5000;

const db = {
    dev: 'mongodb://127.0.0.1:27017/test',
    prod: `mongodb+srv://runranron:${secrets.mongopw}@cluster0-h73bz.mongodb.net/test`,
}

let useDb;
if (false) {
    useDb = db.prod;
} else {
    useDb = db.dev;
}

mongoose.connect(useDb, {}, err => {
    if (err) return console.log(err);
    console.log('DB Connection Achieved');
});
server.listen(port, (err) => {
    console.log("Express is working on port " + port);
  });