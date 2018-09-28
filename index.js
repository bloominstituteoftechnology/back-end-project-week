const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const cors = require('cors')
const server = express();
const bcrypt = require('bcryptjs');
const dbConfig = require('./knexfile')
const jwt = require('jsonwebtoken')
const jwtKey = require('./secret/key').jwtKey;
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());
server.use(cors())

const generateToken = user => {
    const payload = {
        username: user.username,
        user_id: user.id
    }

    const options = {
        expiresIn: '1h',
        jwtid: '54321'
    }

    const token = jwt.sign(payload, jwtKey, options)
    return token
}

const protected = (req, res, next) => {

    const token = req.headers.authorization

    token ?
        jwt.verify(token, jwtKey, (err, decodedToken) => {
            err ?
                res.status(401).json({ message: 'invalid username or password' })
                :
                req.token = decodedToken
            next()
        })
        :
        res.status(401).json({ message: 'invalid username or password' })

}





// route for registering
server.post('/api/register', (req, res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 5)
    creds.password = hash

    db('users').insert(req.body)
        .then(ids => {
            const id = ids[0]
            db('users').where({ id }).first()
                .then(user => {
                    const token = generateToken(user)
                    return res.status(201).json({ message: 'login success', user: user.username, token: token, LoggedIn: true })
                })
                .catch(err => {
                    console.log('post error ', err)
                    return res.status(500).json({ message: 'Invalid username or password', LoggedIn: false})
                })
        })
        .catch(err => {
            console.log('post error', err)
            return res.status(500).json({message: 'Invalid username or password', LoggedIn: false})
        })
})

// route for logging in
server.post('/api/login', (req, res) => {
    const creds = req.body

    db('users').where({ username: creds.username }).first()
        .then(user => {
            if (user || brcypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user)
                return res.status(200).json({ token: token, msg: `Login successful. Welcome, ${user.username}!`, LoggedIn: true})
            } else {
                return res.status(401).send({error: 'Invalid username or password', LoggedIn: false})
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({message: 'Invalid username or password', LoggedIn: false})
        })
})

// route for getting the right notes for user
server.get('/', protected, (req, res) => {
    db.select().from('notes').then(notes => {
        return res.status(200).json(notes)
    }).catch(err => {
        console.log(err)
        return res.status(500).json({message: 'Cannot retrieve notes at this time'})
    })
})

//  route for making notes
server.post('/api/create', protected, (req, res) => {
    const note = req.body
    const { user_id } = req.token;
    note.user_id = user_id;
// need to come back and make a conditional statement for when note doesnt meet certain reqiurements 
    db.insert(note).into('notes').then(note => {
        return res.status(200).json({message: 'note created', note})
    }).catch(err => {
        console.log(err)
        return res.status(500).json({message: 'Error Creating Note', err})
    })
})

// route for viewing each indiviual note
server.get('/api/view/:id', (req, res) => {
    const {id} = req.params;

    db('notes').where({id}).then(note => {
        if (!note) {
            return res.status(404).json({message: 'note not found'})
        } else {
            res.status(200).json(note)
        }
        
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: 'could not retrieve note'})
    })
})

// route for deleting a note
server.delete('/api/view/:id/delete', (req, res) => {
    const {id} = req.params

    db('notes').where({id}).del().then(note => {
        if (!note) {
            return res.status(404).json({message: 'note not found'})
        } else {
            return res.status(200).json({message: 'Note Deletion Successful'})
        }
        
    }).catch(err => {
        console.log(err)
        return res.status(500).json({message: 'Error Deleting Note'})
    })
})

// route for editing notes
server.put('/api/edit/:id', protected, (req, res) => {

    const editeNote = req.body;
    const { user_id } = req.token;
    editeNote.user_id = user_id;
    const {id} = req.params

    db('notes').where({id}).update(editeNote).then(note => {
        if (!note) {
            return res.status(404).json({error: 'note not found'})
        } else {
            return res.status(200).json({message: 'note updated successfully'})
        }
        
    }).catch(err => {
        console.log(err)
        return res.status(500).json({error: 'error update note. please try again'})
    })
})



const port = 3500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});