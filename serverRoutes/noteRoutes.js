const db = require('../data/helpers/noteDb');
const express = require('express');

const router = express.Router();

const sendError = (code, message, error) => {
    return {
        code,
        message,
        error
    }
}

router.get('/', async(req, res, next) => {
    try {
        const response = await db.get();
        res.status(200).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to retrieve notes.', error.message))
    }
})

module.exports = router;