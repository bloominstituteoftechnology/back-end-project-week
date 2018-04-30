const mongoose = require('mongoose');
const router = express.Router();
const User = require('./User.js');

router.post('/', (req, res) => {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(422).json({ message: 'Username and password is required' });
      } else {
        User.findOne({ username }, (err, user) => {
          if (err || user === null)
            res.status(404).json({ message: 'first Invalid credentials' });
          user.checkPassword(password, (err, valid) => {
            if (valid) {
              res.json({ message: 'Loggin Success' });
            } else {
              res.status(404).json({ message: 'Invalid credentials' });
            }
          });
        });
      }
    });

module.exports = router;