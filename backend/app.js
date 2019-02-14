require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const config = require('./config/database');
const mongoose = require('mongoose');
const port = process.env.PORT || 8550;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB!');
});

db.on('error', (err) => {
    console.log(err);
});

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.');
        root = namespace.shift();
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

const notes = require('./routes/notes');
app.use('/notes', notes);

app.listen(port, () => {
    console.log(`Server started!`);
});