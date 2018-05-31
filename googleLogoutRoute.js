const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {


  res.send('googleLogoutRoute is here ')


})





module.exports = router;