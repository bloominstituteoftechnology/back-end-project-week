const router = require('express').Router();
const passport = require('passport');
const notes = require('./notes');
const auth = require('./auth');

function authenticate(req, res, next) {
  let authFunc = passport.authenticate('jwt', function(err, user, info) {
    if (err) return res.json({ error: 'Invalid credentials' });
    if (!user) return res.json({ error: 'Invalid token' });
    next();
  });
  authFunc(req, res, next);
}

router.use('/notes', authenticate, notes);
router.use('/', auth);

module.exports = router;
