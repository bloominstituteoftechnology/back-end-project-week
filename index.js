require('dotenv').config();
const express = require('express');
const server = express();
const knex = require('knex');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//db
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

//Server use
server.use(express.json());
server.use(cors());
server.use(helmet());

const secret = 'backend-project-week';

//MIDDLEWARE
generateToken = user => {
    const payload = {
        email: user.email,
        password: user.password
    }
    const options = {
        expiresIn: '1h',
        jwtid: 'lambdafsw12',
    }
    return jwt.sign(payload, secret, options);
};

// protected = ( req, res, next ) => {
//     const token = req.headers.authorization;
//     if ( token ) {
//         jwt.verify(token, secret, (err, decodedToken) => {
//             if (err) {
//                 res.status(401).json({ message: 'invalid token'})
//             } else {
//                 req.user = {
//                     email: decodedToken.email
//                 }
//                 next();
//             }
//         })
//     } else {
//         return res.status(401).json({ message: 'Invalid authentication' })
//     }
// }

//REGISTER/LOGIN
server.post('/register', async (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync( creds.password, 10);
    creds.password = hash;
    if ( !creds.email || !creds.password ) {
        res.status(400).json({
            message: 'Both email and password are required.'
        });
    } else {
        try {
            const ids = await db('users').insert(creds);
            const id = ids[0];
            const user = await db('users').where({ id }).first();
            const token = generateToken( user );
            res.status(201).json({ id: user.id, token });
        }
        catch ( err ) {
            res.status(500).json( err.message );
        }
    }
});

server.post('/login', ( req , res ) => {
    const creds = req.body;
    db('users')
        .where({ email : creds.email })
        .first()
        .then( user => {
            if ( user && bcrypt.compareSync( creds.password, user.password )){
                const token = generateToken( user )
                res.status(200).json({ token });
            } else {
                res.status(401).json({
                    message: 'Invalid authentication. Please try again.'
                })
            }
        })
        .catch( err => res.status(500).json( err.message ));
});

//GET ALL NOTES
server.get('/note/all', async (req, res) => {
    try {
        const notes = await db('notes')
        res.status(200).json( notes );
    }
    catch ( err ) {
        res.status(500).json( err.message );
    }
});

//GET AN EXISTING NOTE
server.get('/note/:id', async (req, res) => {
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
server.listen(process.env.PORT, () => console.log(`===Server is running on port ${port}===`));