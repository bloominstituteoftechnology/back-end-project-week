const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/notes', async (req, res) => {
    try{
        const notes = await db.select().from('notes');
        res.status(200).json(notes);
    }
    catch (err){
        res.status(500).json({ error: 'Notes could not be retrieved'});
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

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
