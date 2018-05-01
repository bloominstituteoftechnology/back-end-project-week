const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const server = express();
const noteRouter = require('./notes/noteRouter.js');
const userRouter = require('./users/userRouter.js');
mongoose.connect(process.env.URI);
let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open', ()=>{
  console.log('open');
});
server.use(express.json());
server.use('/api/note', noteRouter);
server.use('/api/user', userRouter);
server.get('/', (req,res) => {
  res.status(200).json({api:'running'});
});

const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`\n=== API up on port: ${port} ===\n`));
