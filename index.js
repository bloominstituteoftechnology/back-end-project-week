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

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
