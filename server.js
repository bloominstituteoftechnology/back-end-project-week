const express = require("express");
require("dotenv").config();
const server = express();

const database = "heroku_nq1462wx";
const dbUser = process.env.DBUSER;
const dbPswd = process.env.DBPSWD;
const port = process.env.PORT;

const noteController = require("./Controllers/NoteController");
const authController = require("./Controllers/AuthController");

const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//database connection
mongoose.connect(`mongodb://${dbUser}:${dbPswd}@ds1${port}.mlab.com:${port}/${database}`)
    .then(()=> {
        console.log(`Connected to ${database} database on mlab`)
    })
    .catch(err => {
        console.log({Error: err.message, message: "Did you start an instance of Mongo? || have you checked dbUser and dbPswd?"});
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
server.use(cors({credentials:true}));
server.use(helmet());

server.use("/api/notes", noteController);
server.use("/auth", authController);




server.get("/", (req, res) => {
    res.send({Success: "api is working..."});
});




server.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})



