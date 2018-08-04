const express = require("express");
require("dotenv").config();
const server = express();

const port = process.env.PORT || 5000;

const noteController = require("./Controllers/NoteController");
const authController = require("./Controllers/AuthController");

const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const database = "lambnotesdb";

//database connection
mongoose.connect(`mongodb://cmvnk:temp1234@ds125851.mlab.com:25851/heroku_nq1462wx`)
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

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Cross Site Allowance
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

server.use("/api/notes", noteController);
server.use("/auth", authController);




server.get("/", (req, res) => {
    res.send({Success: "api is working..."});
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});



