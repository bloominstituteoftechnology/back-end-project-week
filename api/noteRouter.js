const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

});

router.get('/', (req, res) => {
    res.json({notes: []});
});

router.get('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;