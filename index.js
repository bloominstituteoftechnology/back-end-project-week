const express = require('express');
const server = express();
const knex = require('knex');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
//db
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
//Server use
server.use(express.json());
server.use(cors());
server.use(helmet());

const secret = 'backend-project-week';



//GET ALL NOTES
server.get('/get/all', async (req, res) => {
    try {
        const notes = await db('notes')
        res.status(200).json( notes );
    }
    catch ( err ) {
        res.status(500).json( err.message );
    }
});

//GET AN EXISTING NOTE
server.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const note = await db('notes').where({ id })
        res.status(200).json( note );
    }
    catch ( err ) {
        res.status(500).json( err.message );
    }
});

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
});

//UPDATE EXISTING NOTE
server.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const toBeUpdated = req.body;
    try {
        const updated = await db('notes').where({ id }).update(toBeUpdated);
        res.status(200).json( updated );
    }
    catch ( err ) {
        res.status(500).json( err.message );
    }
});

//DELETE EXISTING NOTE
server.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await db('notes').where({ id }).del();
        res.status(200).json( deleted );
    }
    catch ( err ) {
        res.status(500).json( err.message );
    }
});

const port = 8000;
server.listen(port, () => console.log(`===Server is running on port ${port}===`));