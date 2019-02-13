const express = require('express'),
    bodyParser = require('body-parser'),
    notes = require('./api/notes');

const app = express();

app
    .use(bodyParser.json())
    .use('/notes', notes)


app.listen(5000);