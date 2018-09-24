const express = require('express');
const server = express();
const knex = require('knex');
const cors = require('cors');
//db
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());
server.use(cors());

//GET ALL NOTES
server.get('/get/all', async (req, res) => {
    try {
        const notes = await db('notes')
        res.status(200).json( notes );
    }
    catch ( err ) {
        res.status(500).json( err.message );
    }
})

//POST A NEW NOTE
server.post('/create', async (req, res) => {
    const note = req.body;
    try {
        const newNote = await db.insert(note).into('notes');
        res.status(201).json( newNote );
    }
    catch ( err ) {
        res.status(500).json( err.message );
    }
})


const port = 8000;
server.listen(port, () => console.log(`===Server is running on port ${port}===`));