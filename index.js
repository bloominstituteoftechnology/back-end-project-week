const express = require('express'),
    bodyParser = require('body-parser'),
    notes = require('./api/notes'),
    cors = require('cors')

const app = express();

app
    .use(cors())
    .use(bodyParser.json())
    .use('/notes', notes);


app.listen(8080);