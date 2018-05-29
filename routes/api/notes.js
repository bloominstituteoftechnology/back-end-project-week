const express = require('express');
const jwt = require('jsonwebtoken');
const router = express();
const passport = require('passport');

router.get('/testing', passport.authenticate('jwt', {session: false}),
    (req, res) => {

    res.status(200).json({message: 'Note Testing is Working'});

});
module.exports = router;