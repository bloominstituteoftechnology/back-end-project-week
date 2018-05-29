// Import router extention & note Model
const router = require('express').Router();
const Note = require('../models/noteModel');

// 
router.route('/').post(((req, res) => {
    Note.find({})
}));

// Router Endpoints
router.route('/').get(((req, res) => {
    // post endpoint
}));

router.route('/').get(((req, res) => {
    // post endpoint
}));

router.route('/').delete(((req, res) => {
    // post endpoint
}));

router.route('/').put(((req, res) => {
    // post endpoint
}));

module.exports = router;