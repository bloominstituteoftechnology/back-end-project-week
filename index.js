const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoute = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use('/api', apiRoute);

app.listen('4000');