const express = require("express");
require("dotenv").config();
const server = express();

const port = "5000";

const noteController = require("./Controllers/NoteController");
const authController = require("./Controllers/AuthController");

const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const database = "lambnotesdb";

//database connection
mongoose.connect(`mongodb://localhost:27017/${database}`)
    .then(()=> {
        console.log(`Connected to ${database} on MongoDB`);
    })
    .catch(err => {
        console.log({Error: err.message, message: "Did you start an instance of Mongo?"});
    });

//middleware

//local
//restricted function goes here for auth later
const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.SECRET;
  
    if(token){
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: 'Token was not decoded', err });
        } 
        next();
      });
  
    } 
    else{
      res.send({message: "Error in retrieving token."})
    }
  }
//global

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/notes", noteController);
server.use("/auth", authController);




server.get("/", (req, res) => {
    res.send({Success: "api is working..."});
});







module.exports = server;



