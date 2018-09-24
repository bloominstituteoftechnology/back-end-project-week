const express = require('express'); 
const knex = require('knex'); 
const Joi = require('joi'); 

// Server setup using express
const server = express(); 
server.use(express.json()); 

// Database setup using knex
const dbConfig = require('./knexfile'); 
const db = knex(dbConfig.development);

// Validation of request body using Joi
const validateBody = body => {
    const schema = {
        title: Joi.string().min(3).max(35).required(), 
        content: Joi.string().min(3).required()
    }
    return Joi.validate(body, schema); 
}

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
    const validationResult = validateBody(newNote);
    if(validationResult.error){
        return res.status(400).json(validationResult.error.details[0].message)
    }

    db('notes').insert(newNote).into('notes').then(id => {
        res.status(201).json(id); 
    }).catch(err => {
        res.status(500).json({Error: "Error posting the data to the database", err})
    })
})


server.listen(9000, () => console.log("Server listening at Port 9000")); 