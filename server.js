const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter =require('./Notes/notesRouter')
const Note = require('./Notes/notes')
const userRouter = require('./Users/userRouter')
const jwt = require('jsonwebtoken');
const secret="jwt secret"
const server = express();

// const corsOptions = {
//     origin: 'https://notejll.netlify.com',
//     optionsSuccessStatus: 200 
//   }
// server.use(cors(corsOptions))

server.use(cors())

// var whitelist = ['https://notejll.netlify.com/']
// server.use(cors({
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }));
server.use(express.json());

getToken = userObj  =>{
    console.log('worked')
    return jwt.sign(userObj,secret, {expiresIn: "1h"})

}

const isTokenValid =(req,res,next)=>{
    const token = req.headers.authorization;
    if (!token) {
      res
        .status(422)
        .json({ error: 'No authorization token found on Authorization header' });
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .json({ error: 'Token invalid, please login', message: err });
        } else {
          next();
        }
      });
    }
}



server.use('/users',userRouter)
server.use('/notes',isTokenValid, notesRouter)

mongoose
.connect('mongodb://JacobLeonLyerla:server1122@ds237770.mlab.com:37770/jlldb')
.then(open=>{
    console.log('connected to db')
})
.catch(err=>{
    console.log('Could not connect to mongodb',err)
})

// mongoose
//   .connect('mongodb://localhost/notesdb')
//   .then(mongo => {
//     console.log('connected to database');
//   })
//   .catch(err => {
//     console.log('Error connecting to database', err);
//   });




server.get('/', (req, res) => {
  res.status(200).json({ api: `api running on port ${port}` });
});


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
