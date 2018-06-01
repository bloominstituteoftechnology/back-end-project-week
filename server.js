const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

server.use(cors({}));
server.use(bodyParser.json());


const port = process.env.PORT || 3333;


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



