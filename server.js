const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();

server.use(cors({}));
server.use(bodyParser.json());


const port = process.env.PORT || 3333;

mongoose.connect('mongodb://localhost/').then(() => {
    console.log('connected to production database');
}).catch(err => {
    console.log('Error connection to production database')
})


server.get('/', (req, res) => {
    res.json({Message: 'I am alive!'});
});


server.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.paragraph) {
        return res.status(442).json({error: 'Must provide a paragraph'})
    }
})
server.listen(port, () => {
    console.log(`Magic is happening on port ${port}`)
})


