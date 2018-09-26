const express=require('express');
const server=express();
const notes=require('./notes/userRoutes');
const configMiddleware=require('./config/middleware')(server);
const configAuthentication=require('./authenticate/userRoutes.js')(server);

server.use('/note',notes);

module.exports=server;