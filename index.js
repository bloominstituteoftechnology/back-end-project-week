const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
 
const server = express();
server.use(express.json());

 server.get('/', (req, res) => {
    res.send("Hello World");
});
 server.get('/notes', (req, res) => {
    db('notes')
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json({error:'database cannot retrieve information'});
    })
});
 server.get('/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes')
    .where({id})
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json({error:'database cannot retrieve information'});
    })
})
 server.post('/notes', (req, res) => {
    const body = req.body;
    db.insert(body)
    .into('notes')
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json({error:'database cannot create information'});
    })
})
 server.put('/notes/:id', (req,res)=> {
    const {id} = req.params;
    const body = req.body;
    db('notes')
    .where({id})
    .update(body)
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json({error:'database cannot update information'});
    })
})
 server.delete('/notes/:id', (req,res) => {
    const {id} = req.params;
    db('notes')
    .where({id})
    .del()
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json({error:'database cannot delete information'});
    })
})
 
  
 const port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`API running on port ${port}`)); 
