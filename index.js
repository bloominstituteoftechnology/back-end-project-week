const express = require('express'); 
const knex = require('knex'); 
const Joi = require('joi'); 
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// Server setup using express
const server = express(); 
server.use(express.json()); 
server.use(cors()); 

// Database setup using knex
const dbConfig = require('./knexfile'); 
const db = knex(dbConfig.development);

// Function generating unique Web Token for each user
const secret = 'The Answer to the Great Question... Of Life, the Universe and Everything... Is...Forty-two'
const generateToken = username => {
    const payload = {
        username,
    }
    const options = {
        expiresIn: '3hr', 
        jwtid: '14869046'
    }

    return jwt.sign(payload, secret, options); 
}

// Validation of request body FOR NOTES using Joi
const validateNoteBody = body => {
    const schema = {
        title: Joi.string().min(3).max(35).required(), 
        content: Joi.string().min(3).required()
    }
    return Joi.validate(body, schema); 
}


// Validation of request body FOR REGISTRATION/LOGIN using Joi
const validateUserBody = body => {
    const schema = {
        username: Joi.string().min(3).required(), 
        password: Joi.string().min(6).required()
    }
    return Joi.validate(body, schema); 
}




server.post("/api/notes/register", (req, res) => {
    const body = req.body; 
    
    // validation called using Joi
    const validated = validateUserBody(body); 
    if(validated.error){
        res.status(400).json(validated.error.details[0].message); 
    }

    //hash the password before sending to database
    const hash = bcrypt.hashSync(body.password, 13);
    body.password = hash;

    db('users').insert(body).then(id => {
        const token = generateToken(body.username);
        res.status(201).json({id, token});
    }).catch(err => {
        res.status(500).json({Error: "Error updating user information in database"})
    })
}); 

server.post("/api/notes/login", (req, res) => {
    const body = req.body; 

    //Validate body using Joi
    const validated = validateUserBody(body); 
    if(validated.error){
        res.status(400).json(validated.error.details[0].message)
    }

    db('users').where({username: body.username}).first().then(user => {
        // compare password in body to password in database
        if(user && bcrypt.compareSync(body.password, user.password)){
            const token = generateToken(body.username); 
            res.status(201).json({message: "Successfully logged in!", token})
        }else {
            res.status(404).json({message: "Sorry your credentials are incorrect, please try again"})
        }
    }).catch(err => {
        res.status(500).json({Error: "Error accessing data from the database"})
    })


})


server.get("/api/notes", (req, res) => {
    db('notes').then(notes => {
        res.status(200).json(notes); 
    }).catch(err => {
        res.status(500).json({error: "Error accessing the data from the database"}); 
    })
}); 

server.get("/api/notes/:id", (req, res) => {
    const {id} = req.params; 
    db('notes').where({id}).then(note => {
        if(note.length > 0){
            res.status(200).json(note); 
        }else{
            res.status(404).json({Error: "The ID used was not found within the database"}); 
        }
    }).catch(err => {
        res.status(500).json({Error: "Error accessing the data from the database"}); 
    }); 
}); 

server.post("/api/notes", (req, res) => {
    const newNote = req.body;

    // Calling Joi validation, if error return which missing requirements
    const validationResult = validateNoteBody(newNote);
    if(validationResult.error){
        return res.status(400).json(validationResult.error.details[0].message)
    }

    db('notes').insert(newNote).into('notes').then(id => {
        res.status(201).json(id); 
    }).catch(err => {
        res.status(500).json({Error: "Error posting the data to the database", err})
    })
}); 

server.delete("/api/notes/:id", (req, res) => {
    const {id} = req.params;
    db('notes').where({id}).del().then(count => {
        if(count < 1){
            res.status(400).json({Error: "The ID specified does not exist within the database"}); 
        }else{
            res.status(200).json({message: "Deleted the note successfully!"}); 
        }
    }).catch(err => {
        res.status(500).json({Error: "There was an error with deleted the note in the database", err})
    })
}); 

server.put("/api/notes/:id", (req, res) => {
    const {id} = req.params; 
    const newEdit = req.body;

    // Joi validation 
    const validated = validateNoteBody(newEdit); 
    if(validated.error){
        res.status(400).json(validated.error.details[0].message)
    }

    db('notes').where({id}).update(newEdit).then(count => {
        if(count < 1){
            res.status(400).json({Error: "The ID specified could not be found within the database"})
        }else{
            res.status(200).json({message: "Successfully updated the note!"})
        }
    }).catch(err => {
        res.status(500).json(err); 
    })
})


server.listen(9000, () => console.log("Server listening at Port 9000")); 