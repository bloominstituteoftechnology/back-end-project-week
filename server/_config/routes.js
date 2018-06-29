const userRoutes = require('../../server/userController');
const port = process.env.PORT || 3333;
// const express = require('express');
const notes = require('../../server/noteController');

const session = require('express-session');
const secret = 'canolis are delish';

const sessionOptions = {
    secret: secret ,
    cookie: {
      maxAge: 1000 * 60 * 60, // an hour
    },
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: 'noname',
  };

module.exports = server => {
    //sanity check route
    server.get('/', function(req, res) {
        res.send({ api: `Server up and running on port ${port}`});
    });

    server.use(session(sessionOptions));
    server.get('/notelist', notes); 
    server.post('/createnote', notes);
    server.delete('/:id', notes);
    server.put('/:id', notes);   
  
    server.get('/profile', userRoutes);
    server.delete('/profile/:id', userRoutes);
    server.post('/login', userRoutes);
    server.get('/logout', userRoutes);
    server.use('/users', userRoutes);
    server.use('/users', createUser);
    

};




