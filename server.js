const express = require('express');
const morgan = require('morgan');
const Login = require('/User/Login.js');
const Logout = require('/User/Logout.js');
const Signup = require('/User/Signup.js');
const Create = require('/Note/Create.js');
const Update = require('/Note/Update.js');
const Delete = require('/Note/Delete.js');
const mongoose = require('mongoose')
const Port = process.env.PORT || 5000;
mongoose
.connect('mongodb://localhost/noteDB/')
.then( console.log('===Connected to MongoDB==='))
.catch( (err) => {
    console.log('===Error Connecting to MongoDB===')
});

const server = express;
server.use(express.json());
server.use(morgan('dev'));
server.use('/login', Login);
server.use('/logout', Logout);
server.use('/signup', Signup);
server.use('/create', Create);
server.use('/update', Update);
server.use('/delete', Delete);
server.get('/', (req, res) => {
    res.status(200).json({api: 'running!'});
})
server.listen(Port, () => console.log(`\n=== API up on port: ${Port} ===\n`));