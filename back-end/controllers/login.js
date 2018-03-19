const jwt = require('jsonwebtoken');
const secret = require('../config');

const login = (req, res) => {
  if(req.email) {
    const token = jwt.sign({ email: req.email}, secret)
    res.json({ token });
  } else {
    res.status(404).json({error: 'Must properly login to view page'})
  }
};

module.exports = {
  login
}