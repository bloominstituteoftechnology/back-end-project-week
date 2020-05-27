const express = require('express');
const router  = express.Router();

router.get('/api/notes/test', (req, res, next) => {

  res.send('test');

});

router.use((err, req, res, next) => {

  switch( err ) {
    case '':
      break;
    default:
      break;
  }

});

module.exports = router;
