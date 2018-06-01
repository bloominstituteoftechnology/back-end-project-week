import LocalStrategy from 'passport-local';
import PassportJWT, { ExtractJwt } from 'passport-jwt';
import User from '../Users/userSchema';

const JwtStrategy = PassportJWT.Strategy;
const secret = 'that is what I shared yesterday lol';
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const authorize = {
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

export default Authorize;