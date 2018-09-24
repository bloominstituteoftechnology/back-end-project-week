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


server.get(`/notes/:id`, (req,res) => {

    db('notes').where({ id:req.params.id })
        .then((id) => {
            res.json(id);
        })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({message: "The note with the specified ID does not exist."});
        })

    .catch((fail) => {
        console.log(fail)
        res.status(500).json({error: "The note's information could not be retrieved."});
    })
})

server.put(`/notes/:id`, (req, res) => {

    db('notes').where({ id:req.params.id } ).update(req.body)
    .then((item) => {
        res.status(201).json(item);
    })
    .catch((fail) => {
        console.log(fail);
        res.status(404).json({ message: "The note with the specified ID does not exist."});
    });
})

server.delete('/notes/:id', (req, res) => {
    db('notes').where({ id:req.params.id }).delete()
        .then((item) => {
            res.status(201).json(item);
            })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({ message: "The note with the specified ID didn't delete."});
            });
});








const port = 5000;
server.listen(port, function() {
console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});