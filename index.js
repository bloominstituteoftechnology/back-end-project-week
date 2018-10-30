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

//  GET view notes
server.get('/api/view/:id', (req, res) => {
    const {id} = req.params
     db('notes').where({id}).then(note => {
        res.status(200).json(note)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: 'Note not found'})
    })
})

 const port = 8000;
server.listen(port, function () {
    console.log(`\n=*= Backend Project Week Rolling On ${port} =*=\n`);
});
