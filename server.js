const express = require('express'); 
require('dotenv').config(); 
const cors = require('cors'); 
const morgan = require('morgan'); 
const helmet = require('helmet');
const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken'); 


const notesRouter = require('./Notes/NotesRouter.js');
const usersRouter = require('./Users/UsersRouter.js');
const User = require('./Users/UsersModel.js'); 
const Note = require('./Notes/NotesModel.js'); 

const server = express();
const secret = 'No woman, No cry!';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
}; 

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());

server.use('/notes', notesRouter);
server.use('/users', usersRouter); 

// server.get('/', (req, res) => {
//     res.status(200).json('API up and running!'); 
// }); 

// added dotenv
server.get('/', (req, res) => {
    res.send(`<h2>DB: Server is up! </h2>`)
}); 

server.post('/register', (req, res) => {
    User.create(req.body)
        .then(user => {
            const token = generateToken(user); 
            
            res.status(201).json({ email: user.email, token });
        })
        .catch(error => res.status(500).json({ error: error.message })); 
}); 

server.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: error.message });
        return; 
    } 

    User.findOne({ email })
        .then(user => {
            if(user) {
                user
                    .validatePassword(password)
                    .then(passwordsMatch => { 
                        if(passwordsMatch) {
                            const token = generateToken(user);

                        res.status(200).json({ message: `Welcome, ${email}!`, token }); 
                    } else {
                        res.status(401).send('Invalid credentials');
                    }
                })
                .catch(error => {
                    res.send('Error comparing passwords');
                });
            } else {
                res.status(401).send('Invalid credentials');
            }
        })
        .catch(error => {
            res.send({error: error.message }); 
        });
    });

    function generateToken(user) {
        const options = {
            expiresIn: '1h',
        };
        const payload = { name: user.email }; 

        return jwt.sign(payload, secret, options); 
    }

    function restricted(req, res, next) {
        const token = req.headers.authorization; 

        if(token) {
            jwt.verify(token, secret, (error, decodedToken) => {
                if(error) {
                    res.status(401).json({ message: 'Denied access. Not decoded.' });
                }

                next(); 
            }); 
        } else {
            res.status(401).json({ message: 'Access not allowed. No token.' }); 
        }
    }


// server.put('/users/:id', (req, res) => {
//         const { id } = req.params; 
//         const { email, password } = req.body;
//         const updatedUser = { email, password }; 
//         if (!email || !password) {
//             res.status(400).json({ error: 'Please enter email and password.' }); 
//             return;
//         } 
//         User    
//             .findByIdAndUpdate(id, updatedUser)
//             .then(response => {
//                 res.json(response);                 
//             })
//             .catch(error => {
//                 res.status(500).json({ error: 'User cannot be modified.' })
//         });
// });

server.get('/users', restricted, (req, res) => {
    User.findByIdAndRemove({})
        .select('email')
        .then(users => {
            res.status(200).json(users); 
        })
        .catch(error => {
            return res.status(500).json(error); 
        }); 
}); 

mongoose.Promise = global.Promise;

mongoose
    // .connect('mongodb://localhost/lambdaNotesDb')
    .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds018538.mlab.com:18538/lambdanotesdb`)
    .then(() => {
        console.log('\=== Connected to database server ===\n');
        // server.listen(port, (req, res) => {
        //     console.log(`\n=== Server up and running on ${port} ===\n`); 
        // }); 
    })
    .catch(error => {
        console.log('\n=== Error connecting to database server ===\n', error);
    });

const port = process.env.PORT || 5000; 

server.listen(port, () => {
    console.log(`\n=== Server up and running on ${port} ===\n`); 
});
    

