const router = require('express').Router();

router.route('/').get((req, res) => {
  res.json({ notes: 'running' });
});

module.exports = router;
