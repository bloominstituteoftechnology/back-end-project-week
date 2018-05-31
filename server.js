const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { user, password } = require('./config/user');

const port = process.env.PORT || 5000;

// mongoose
//     .connect(`mongodb://${user}:${password}@ds123084.mlab.com:23084/lambda-notes`)
//     .then(res => {
//         console.log('\n connected to mongodb \n');
//     })
//     .catch(err => {
//         console.log('error connecting to mongodb',user,password, err);
//     });

const server = express();

server.get('/', (req,res) => {
    res.status(200).json({ api: 'running' });
});

server.use(cors());
server.use(express.json());

server.listen(port, () => console.log(`\n === API running on port ${port} === \n`));