const express	= require('express');
const noteDb	= require('../data/models/noteDb.js');

const router	= express.Router();

// sanity check
router.get('/', (req, res) => {
	return res.status(200).json('Server is running.');
});

module.exports = router;
