const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = {
  secretOrKey: process.env.SECRET || 'keyboardcat',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
