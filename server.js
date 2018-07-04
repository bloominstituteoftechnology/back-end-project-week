const express = require("express");
const server = express();

const database = "heroku_nq1462wx";
const dbUser = "cmvnk";
const dbPswd = "temp1234";
const port = "25851";

const noteController = require("./Controllers/NoteController");
const userController = require("./Controllers/UserController");

const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

//database connection
mongoose.connect(`mongodb://${dbUser}:${dbPswd}@ds1${port}.mlab.com:${port}/${database}`)
    .then(()=> {
        console.log(`Connected to ${database} database on mlab`)
    })
    .catch(err => {
        console.log({Error: err.message, message: "Did you start an instance of Mongo?"});
    });

//middleware

//local
//restricted function goes here for auth later

//global

server.use(express.json());
server.use(cors({credentials:true}));
server.use(helmet());

server.use("/api/users", userController);
server.use("/api/notes", noteController);

server.get("/", (req, res) => {
    res.send({Success: "api is working..."});
});

server.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})



