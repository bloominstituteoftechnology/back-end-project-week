const express = require('express');
const server = express();
const PORT = 5566;

server.use(express.json());

server.post('/notes', (req, res) => {

});

server.get('/notes/', (req, res) => {

});

server.get('/notes/:id', (req, res) => {

});

server.put('/notes/:id', (req, res) => {

});

server.delete('/notes/:id', (req, res) => {

});

server.listen(PORT, () => {
    console.log(`Server is alive, alert, and enthusiastic on port ${PORT}`)
})