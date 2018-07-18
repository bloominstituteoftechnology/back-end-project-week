const users = require('./users');
const router = require('express').Router();


router.get('/', (req,res) => {
    res.send(200).json({message:'user Router up'})
})




module.exports = router; 