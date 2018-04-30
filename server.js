const express = require('express');
const mongoose = require('mongoose');

const server = express();

mongoose.connect('mongodb://localhost/backend')
.then(()=>console.log('connected'))
.catch(err=>{console.log('not connected')}
);

server.get('/', (req,res) => {
  res.status(200).json({api:'running'});
});

const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`\n=== API up on port: ${port} ===\n`));
