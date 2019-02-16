const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', require('./api/rootRouter'));

app.get('/', (req, res) => {
    res.status(200).send('API Active');
});

module.exports = app;
