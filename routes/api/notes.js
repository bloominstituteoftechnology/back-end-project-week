const express = require('express');
const router = express();

router.get('/testing', (req, res) => {

    res.status(200).json({message: 'Note Testing is Working'});

});
module.exports = router;