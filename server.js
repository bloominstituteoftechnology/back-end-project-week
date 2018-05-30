const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter =require('./Notes/notesRouter')
const Note = require('./Notes/notes')

const corsOptions = {
    origin: 'https://notejll.netlify.com/',
    optionsSuccessStatus: 200 
  }

const server = express();
server.use(cors(corsOptions}))

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
server.use('/notes', notesRouter)

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
