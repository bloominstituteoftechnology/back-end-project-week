const express = require('express');
const server = express();
const knex = require('knex')
const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const knexConfig = require('../knexfile')[dbEnvironment];
const db = knex(knexConfig);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const cors = require('cors');
const jwtSecret = process.env.SECRET;

require('dotenv').config();

server.use(cors({origin: 'http://localhost:3000'}));
server.use(express.json())

//COOKIES
server.use(cookieSession({
    maxAge: '1hr',
    secret: jwtSecret
}))

//PASSPORT INITIALIZATION
server.use(passport.initialize())
server.use(passport.session())

//SERIALIZE&DESERIALIZE USER
passport.serializeUser((userID, done)=>{ //this will take a user object from the database. 
    console.log("Serialize User", userID)
    done(null, userID) //this should grab one piece of unique data from the user obj to be encrypted and add it to a cookie. 
});

passport.deserializeUser((id, done)=>{
    console.log(id)
    db('users')
    .where({googleID: id})
    .then(user => { console.log("Deserialize User",user)
        done(null, user)
    })
    .catch(err => console.log('deserialize err:', err))
});


//GOOGLE PASSPORT STRATEGY

passport.use(new GoogleStrategy({
    callbackURL: 'http://localhost:8888/google/redirect',
    clientID: `${keys.google.clientId}`,
    clientSecret: keys.google.clientSecret,
    scope: ['profile']
},
(accessToken, refreshToken, profile, done)=>{
    console.log('ProfileID', profile.id)
    db('users').where({googleID: profile.id }).first()
.then(user => { 
    if(user){ console.log('find user success')
        done(null, user)
    }
    else{
        db('users').insert({username: profile.displayName, googleID: profile.id})
        .then(newUser =>{ console.log('add new user success', newUser)
            done(null, newUser )
        }).catch(err => console.log('insertUserError', err))  
    }
}).catch(err => { console.log('find user error', err)})
                    
}
))

//GOOGLE AUTHENTICATE
server.get('/signin/google', passport.authenticate('google', {scope: ['profile']}))

server.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    
    console.log('redirect success')
    res.redirect('http://localhost:3000/profile');
    
    
    res.status(200).json({message: req.user}) 
})
//--- END:PASSPORT DECLARATIONS

//TOKEN GENERATOR
const generateToken = (user) =>{
    const payload = {
            email: user.email,
            department: user.department
        }
    const options = {
        expiresIn: '20m'
    }
    
    return jwt.sign(payload, jwtSecret, options)
    }

//REGISTER
server.post('/register', (req, res) =>{
    let user = req.body;
    console.log(user.password && user.email, user)
    if(user.password && user.email){
        let hash = bcrypt.hashSync(user.password, 12)
        user.password = hash;
        db('users').insert(user)
        .then(user => {res.status(201).json({user})})
        .catch(err => res.status(500).json({message: 'Error occurred while retrieving data.'}))
    }
    else{
        res.status(401).json({message: "Please enter both an email and password."})
    }
    
})
//LOGIN
server.post('/login', async (req, res) =>{
    let {password, email} = req.body;
    console.log({password, email})
    try{

        let user = await db('users').where({email}).first();
        console.log(user && bcrypt.compareSync(password, user.password))
        if(user && bcrypt.compareSync(password, user.password) ){
            let token = generateToken(user)
            res.cookie('jwt', token)
            res.status(200).json({message: `Welcome, ${user.email}!`, token})
        }
        else{
            res.status(401).json({ message: 'Authentication failed.' });
        }
        
    }
    catch(err){
        res.status(500).json({err})
    }
});

//LOGOUT
server.post('/logout', (req, res) =>{
    req.logout() //this is a passport method 
    
})



 
 server.get('/note/get/all', async (req, res) => {

    try{
        const notes = await db('usernotes');
        if(notes){
            res.status(200).json(notes)
        }

    }

    catch(err){
        res.status(500).json({message: 'An error occured while retrieving the data.'})
    }
});

 server.post('/note/create', async (req, res) => {
     const note = {title, content} = req.body;
    console.log(note)
     try{
        const response = await db('usernotes').returning('id').insert({title, content});
        res.status(200).json(response) 
        
    }

     catch(err){
        res.status(500).json({message: 'An error occured while processing the data.'})
     }
});

 server.put('/note/edit/:id', async (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    try{
        if(title && content){
            const updated = await db('usernotes').where({id}).update({title, content})
            res.status(200).json(updated)
             }
        else if(title && !content){
                const updated = await db('usernotes').where({id}).update({title})
                res.status(200).json(updated)
            }
        else if(!title && content){
            const updated = await db('usernotes').where({id}).update({content})
            res.status(200).json(updated)
            }
        else{
            res.status(400).json({message: 'Please submit the proper inputs.'})
        } 
    }
    catch(err){
        res.status(500).json({message: 'An error occured while processing the data.'})
    }
});

 server.delete('/note/delete/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const response = await db('usernotes').where({id}).del()
        res.status(200).json(response)
    }
    catch(err){
        res.status(500).json({message: 'An error occured while processing the data.'})
    }
});



module.exports = server;