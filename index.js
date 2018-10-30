const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const cors = require('cors')
const server = express();
const bcrypt = require('bcryptjs');
const dbConfig = require('./knexfile')
const session = require('express-session');
const db = knex(dbConfig.development);
server.use(session(sessionConfig))
server.use(express.json());
server.use(helmet());
server.use(cors())

//  GET view existing note
server.get('/api/view/:id', (req, res) => {
    const {id} = req.params
     db('notes').where({id}).then(note => {
        res.status(200).json(note)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: 'Note not found'})
    })
})

// PUT  edit existing note
server.put('/api/edit/:id', (req, res) => {
     const note = req.body
    const {id} = req.params
     db('notes').where({id}).update(note).then(note => {
<<<<<<< HEAD
        res.status(200).json({message: 'note updated'})
    }).catch(err => {
        res.status(500).json({error: 'note could not be updated'})
=======
        res.status(200).json({message: 'note updated successfully'})
    }).catch(err => {
        res.status(500).json({error: 'error update note. please try again'})
>>>>>>> 84030fe2e2a9f06dcbeffbf358b940980a9d2f52
    })
})


 const port = 8000;
server.listen(port, function () {
    console.log(`\n=*= Backend Project Week Rolling On ${port} =*=\n`);
});
