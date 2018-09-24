const express=require('express');
const server=express();
const notes=require('./notes/userRoutes');
const configMiddleware=require('./config/middleware')(server);
server.use('/note',notes);

const port=9000
server.listen(port,()=>console.log('Engines firing server starting new horizons venturing.'));