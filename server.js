const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');

const app = express();

app.use(express.json());

//DB
const db = require('./config/keys').mongoURL;
mongoose
    .connect(db)
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err));

app.use('/api/users', users);
app.get('/testing', (req, res) => {

    res.status(200).json({message: 'Testing working'});

});

const port = process.env.port || 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));