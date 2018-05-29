const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter =require('./Notes/notesRouter')
const port = process.env.PORT || 5500;
mongoose
.connect('mongodb://JacobLeonLyerla:Otokonoko1990@ds237770.mlab.com:37770/jlldb')
mongoose.connection.once('open',()=>{
    console.log('connected to db')
})
.catch(err=>{
    console.log('Could not connect to mongodb',err)
})


const server = express();
server.use(cors());
server.use(express.json());
server.use('/notes', notesRouter)
server.get('/', (req, res) => {
  res.status(200).json({ api: `api running on port ${port}` });
});
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
