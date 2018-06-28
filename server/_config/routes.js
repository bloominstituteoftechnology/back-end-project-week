const userRoutes = require('../../server/userController');
const port = process.env.PORT || 3333;
// const express = require('express');
const notes = require('../../server/noteController');

module.exports = server => {
    //sanity check route
    server.get('/', function(req, res) {
        res.send({ api: `Server up and running on port ${port}`});
    });

    server.get('/notelist', notes); 
    server.post('/createnote', notes);
    server.delete('/:id', notes);  
    server.use('/users', userRoutes);
    server.use('/users', createUser);

};




