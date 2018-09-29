const express=require('express');
const server=express();
const notes=require('./notes/userRoutes');
const configMiddleware=require('./config/middleware')(server);
const configAuthentication=require('./authenticate/userRoutes.js')(server);

server.use('/note',notes);
server.get('/',(req,res)=>{
    res.status(200).json({message:'API running.'});
})

module.exports=server;