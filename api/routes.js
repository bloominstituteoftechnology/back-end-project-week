const express = require('express');

const router = express.Router();

const db = require('../db/db.js')

router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN Backend API is running."})
})

module.exports = router