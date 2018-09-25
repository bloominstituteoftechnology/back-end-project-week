const express = require('express');

const welcome = express.Router();

const dbFunc = require('../db/db.js')

welcome.use(express.json());

welcome.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN /welcome is running."})
})

module.exports = welcome