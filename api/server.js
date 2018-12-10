const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const cors = require('cors');
const db = require('knex')(require('../knexfile').development);
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short')); 

//********************** NOTES CRUD **********************// 

//----- GET notes -----
//Display a list of notes.
server.get('/api/notes', (req, res) => {
    db('notes') 
    .then(notes=> { 
      res.status(200).json(notes);
    }) 
    .catch(err => {
        console.log(err)
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//View an existing note.
server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params; 
    db('notes')
    .where({ id:id })
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err));
  });
/*
//----- POST notes -----
//Create a note with a title and content.
server.post('/api/notes', async (req, res) => {
    const userData = req.body;
    if (!userData.name || userData.name==="" ) {
        const errorMessage = "Please provide name for the user"; 
        res.status(400).json({ errorMessage});
        return
    }   
    try {
        await userDb.insert(userData);
    } catch (error) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
            return      
    }
    res.status(201).json({message: "user was added to database" });
    return
});

//----- PUT notes -----
//Edit an existing note.
server.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const userChanges = req.body;
    userDb.get(id)
        .then(user => { 
        if (!user) { 
           res.status(404).json({ message: "The user with the specified ID does not exist." });
           return  
         }
         })
         .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
         });
          
        if (!userChanges.name || userChanges.name==="" ) {
          const errorMessage = "Please provide name for the user"; 
          res.status(400).json({ errorMessage });
          return
        } 
        try {
          await userDb.update(id, userChanges)
        } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
        return      
      }
      res.status(201).json({message: "user was updated" });
      return
      });

//----- DELETE notes -----
//Delete an existing note.
server.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
   // userDb.get(id)
   userDb.remove(id)
   .then(count => res.status(200).json(count))
    // .then(user => { 
     // console.log("we're in then")
        //  if (!user) { 
        //  res.status(404).json({ message: "The post with the specified ID does not exist." });
          return
       } else if (user){ // or oops - if we could retrieve it, we would but it's not here, status 404
        userDb.remove(user.id) 
         res.status(200).json({ message: "The post with the specified ID was deleted." });
         return
       }
        })
        .catch(err => {
          res //if data can't be retrieved ... 
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
        //res.status(200).json({ message: "The post with the specified ID was deleted." });
      });
*/

module.exports = server;