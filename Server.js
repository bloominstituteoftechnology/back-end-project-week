//Modules
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./Routers/UserRouter")
const notesRouter = require("./Routers/NotesRouter")
const StripeRouter = require("./Routers/StripeRouter")

//Database
let uri = 'mongodb://2940cristian:dance360@ds235840.mlab.com:35840/noteslambda';
mongoose.connect(uri, function(err, success) {
    if(err) throw err;
    console.log("Connected to DB")
})

//Middleware
server.set("view engine", "pug");
server.use(require("body-parser").urlencoded({extended: false}));
server.use(express.json());
server.use(cors());




//Routers
server.get('/testing', (req, res) => {
  res.send("API RUNNING")
})
//NOTES ROUTERS
server.use('/notes', notesRouter)
//USER ROUTER
server.use('/users', userRouter)

server.use("/charge", StripeRouter)


server.get("user/signin/callback", (req, res) => {
  console.log('query', req.query);
  const {code} = code;

  if(!code) {
    return res.send({
      success: false
    })
  }


  console.log('code', code)
})


server.listen(process.env.PORT || 5000);

