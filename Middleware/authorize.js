const LocalStrategy = require('passport-local');
const PassportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../Users/userSchema');

const secret = 'moonlanding';
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
  secretOrKey: secret,
};

const Authorize = {
  localStrategy: new LocalStrategy((username, password, done) => {
    User
    	.findOne({ username })
      .then(user => {
        console.log(user);
        if (!user) {
          done(null, false);
        } else {
          user
            .validatePassword(password)
            .then(isValid => {
              if (isValid) {
                const { _id, username } = user;
                return done(null, { _id, username });
              } else {
                return done(null, false);
              }
            })
            .catch(err => {
              return done(err);
            });
        }
      })
      .catch(err => done(err));
  }),
  jwtStrategy: new JwtStrategy(jwtOptions, (payload, done) => {
    console.log(payload);
		User
			.findById(payload.sub)
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => {
        done(err);
      });
  }),
} 

module.exports = Authorize;