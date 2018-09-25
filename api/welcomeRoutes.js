const express = require('express');
const bcrypt = require('bcrypt');


const welcome = express.Router();

const dbFunc = require('../db/db.js')

welcome.use(express.json());

welcome.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN /welcome is running."})
})

welcome.post('/register', (req, res) => {
    const newUser = req.body; 
    const hash = bcrypt.hashSync(newUser.password, 3);
    newUser.hash = hash

    
})

module.exports = welcome