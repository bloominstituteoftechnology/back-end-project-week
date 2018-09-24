const express = require('express');
const knex = require('knex');
const server = express();
server.use(express.json());


const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

server.get('/', (req, res) => {
res.send('API Running...');
});


server.post('/notes', (req, res) => {
    const item = req.body;

    db('notes').insert(item)
        .then((ids)=> { 
            res.status(201).json(ids);
        })
                .catch((fail) => {
                    console.log(fail);
                    res.status(500).json({ error: "There was an error while saving the note to the database." });
                });
});

server.get('/notes', (req, res) => {
    db('notes').then(item => {
        res.status(200).json(item)
    }).catch((fail) => {
        console.log(fail);
        res.status(500).json({ error: "There was an error while receiving the notes" });
    })
})










const port = 5000;
server.listen(port, function() {
console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});