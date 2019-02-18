const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', require('./api/rootRouter'));

const PORT = process.env.PORT || '3300';

app.get('/', (req, res) => {
    res.status(200).send(`API active on port: ${PORT}`);
});

module.exports = app;
