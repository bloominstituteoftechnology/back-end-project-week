const express = require('express');
const knex = require('knex');
const server = express();
const cors = require('cors');
const bcrypt = require('bcrypt')

server.use(express.json());
server.use(cors());

const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

const jwt = require('jsonwebtoken');


// exports.uploadFile = functions.https.onRequest((req, res) => {
//     res.status(200).json({
//         message: "It worked"
//     });
// })

const secret = "lovey lovebirds"
    function generateToken(user) {
        const payload = {
            username: user.username
        };
        const options = {
            expiresIn: '1h',
            jwtid: '12345',
        }
        return jwt.sign(payload, secret, options)
}


function restricted(req, res, next) {

    const token = req.headers.authorization;
    // localStorage.removeItem('jwt');
    // let savedToken = localStorage.getItem('jwt');

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: "token invalid"})
            } else {
                req.user = {username: decodedToken.username};
                next();
        }
    })
    } else {
    res.status(401).json({message: "no token"})
    }
}




server.get('/', restricted, (req, res) => {
res.send('API Running...');
});


server.post('/notes', (req, res) => {
    const item = req.body;

    db('notes').insert(item)
        .then((ids)=> { 
            res.status(201).json(ids);
        })
                .catch((fail) => {
                    console.log(fail);
                    res.status(500).json({ error: "There was an error while saving the note to the database." });
                });
});

server.get('/notes', (req, res) => {

    db('notes').then(item => {
        res.status(200).json(item)
    }).catch((fail) => {
        console.log(fail);
        res.status(500).json({ error: "There was an error while receiving the notes." });
    })

})


server.get(`/notes/:id`, (req,res) => {

    db('notes').where({ id:req.params.id })
        .then((id) => {
            console.log(id);
            if(id.length === 0){
                return res.status(404).json({err:" The note with that ID is not found."});
            }
            res.status(201).json(id);
        })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({message: "The note with the specified ID does not exist."});
        })

    .catch((fail) => {
        console.log(fail)
        res.status(500).json({error: "The note's information could not be retrieved."});
    })

})

server.put(`/notes/:id`, (req, res) => {

    db('notes').where({ id:req.params.id } ).update(req.body)
    .then((item) => {
        if(item === 0){
            return res.status(404).json({err:" The note with that ID is not found "});
        } else {
        res.status(201).json(item);
    }})
    .catch((fail) => {
        console.log(fail);
        res.status(404).json({ message: "The note with the specified ID does not exist."});
    });

})

server.delete('/notes/:id', (req, res) => {

    db('notes').where({ id:req.params.id }).delete()
        .then((item) => {
            if(item === 0){
                return res.status(404).json({err:" The note with that ID is not found "});
            } else {
            res.status(201).json(item);
            }})
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({ message: "The note with the specified ID didn't delete."});
            });

});

server.post('/register', (req, res) => {
    //3 steps to hash
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 8);
    creds.password = hash;


    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            const token = generateToken(creds);
            res.status(201).json({ token, id });
        })
        .catch(err => {
            console.log('/register POST error:', err);
            res.status(500).send('Please Try Again Later');
        });
});


server.get('/users', restricted, (req, res) => {
    
    db('users').select('id', 'username', 'password').then(users => {
        res.status(201).json(users);
    }).catch(err => {
        console.log("error:", err);
        res.status(500).json({ err: "There was an error while retrieving the users." });
    })

});



server.post('/login', (req, res) => {
    const creds = req.body;

    db('users')
    .where({username: creds.username})
    .first()
    .then(user => { 
        if (user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user);
            res.status(200).json({ token });
        } else {
            res.status(401).json({message: 'Incorrect Combination.'});
        }
    }).catch(err => {
        console.log('/api/login Post error:', err);
        res.status(500).send(err, "Please Try Again Later.")});
});





// server.post('/notes', (req, res) => {
//     const item = req.body;

//     db('notes').insert(item)
//         .then((ids)=> { 
//             res.status(201).json(ids);
//         })
//                 .catch((fail) => {
//                     console.log(fail);
//                     res.status(500).json({ error: "There was an error while saving the note to the database." });
//                 });
// });







const port = 5000;
server.listen(port, function() {
console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});