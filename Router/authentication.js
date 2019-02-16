const express = require('express');

const parser = express.json();
const router = express.Router();

router.use(parser)

//endpoint

router.post('/register', (req, res)=>{

})

router.post('/login',(req, res)=>{

})


module.exports = router;