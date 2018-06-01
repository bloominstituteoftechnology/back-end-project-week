//Modules
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./Routers/UserRouter")
const notesRouter = require("./Routers/NotesRouter")
const StripeRouter = require("./Routers/StripeRouter")
const request = require("superagent")

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


server.get("user/signin/callback", (req, res, next) => {
 console.log(req)
 res.send("LOL")

  // if(!code) {
  //    res.send({
  //     success: false
  //   })
  // };

  // if(code) {
  //   res.send("JELLO")
  // }

  // request
  // .post("https://github.com/login/oauth/access_token")
  // .send({
  //   client_id: "7e0997d4f79135cba0f9",
  //   client_secret: "6ecf33a0078cbff980b00c79ed03908477fd1d56",
  //   code: code
  // })
  // .set("Accept", "application/json")
  // .then(function(result) {
  //   const data = req.body;
  //   result.send(data);
  // })

  
})


server.listen(process.env.PORT || 5000);

