require('dotenv').config();
const express = require('express');
const db = require('./data/db');
const cors = require('cors');
const server = express();

const corsOptions = {
    origin: 'http://localhost:3000',
  };

server.use(express.json());
server.use(cors(corsOptions));

server.get('/notes', async (req, res) => {
    try{
        const notes = await db.select().from('notes');
        const secret = process.env.SECRET;
        res.status(200).json({secret, notes});
    }
    catch (err){
        res.status(500).json({ error: 'Notes could not be retrieved'});
    }
})

server.get('/notes/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const note = await db('notes').where({id});
        res.status(200).json({note});
    }
    catch(err){
        res.status(500).json({error: 'Note could not be retrieved'});
    }
})

server.post('/notes', async (req,res) => {
    let note = req.body;
    if(!('title') in note){
        res.status(400).send({ error: "Please provide a title for your note."});
    }
    else if(note.title.length > 30){
        res.status(400).send({error: "Please limit the characters in the title to 30."});
    }
    try { 
        await db.insert(note).into('notes');
        res.status(201).json({msg: 'Note successfully created'});
    }

    catch(err){
        res.status(500).json({error: 'Note could not be created'});
    }
})

server.put('/notes/:id', async (req,res) => {
    const changes = req.body;
    const {id} = req.params;
    const {title, content} = changes;
    try {
        await db('notes').where({id}).update(changes);
        res.status(200).json({msg: `Note #${id} has successfully been updated as:`, title, content });
    }
    catch(err){
        res.status(500).json({error:'Note could not be updated.'});
    }
})

server.delete('/notes/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await db('notes').where({id}).del();
        res.status(200).json({msg: `Note #${id} has successfully been deleted.`})
    }
    catch(err){
        res.status(500).json({error:'Note could not be deleted'});
    }
})

const port = process.env.PORT || 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
