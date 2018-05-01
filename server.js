const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const server = express();
mongoose.connect(process.env.URI)
.then(()=>{
  console.log('connected');
})
.catch(err=>{
  console.log(err);
});

server.get('/', (req,res) => {
  res.status(200).json({api:'running'});
});

const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`\n=== API up on port: ${port} ===\n`));
