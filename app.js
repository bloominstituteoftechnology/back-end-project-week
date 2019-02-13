const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./api/root'));

app.get('/', (req, res) => {
    res.status(200).send('API Active');
});

module.exports = app;