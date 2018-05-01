// Libraries
const jwt = require('jsonwebtoken'); // https://www.npmjs.com/package/jsonwebtoken
// passport has like 'plugins' to extend functionality -- we are using passport-local, which is one of these 'plugins'
const passport = require('passport'); // https://www.npmjs.com/package/passport
// Will use this to generate middleware
const LocalStrategy = require('passport-local'); // https://www.npmjs.com/package/passport-local

// https://www.npmjs.com/package/passport-jwt
// We use this to teach passport how to grab the token and read it from the header
const { ExtractJwt } = require('passport-jwt');
// ???
const JwtStrategy = require('passport-jwt').Strategy;

// User.js with userSchema, bcrypt hashing, and bycrypt password compare
const User = require('../users/User');
const secret = 'no size limit on tokens';

function makeToken(user) {
  // return token
  // sub: subject (id)
  // Time stamp so we know when the document was created and when it will expire.
  const timestamp = new Date().getTime();
  const payload = {
    // sub: subject (id) who the token is about -- using _id, since this is a part of the industry standard
    sub: user._id,
    username: user.username,
    // we don't want to send the password back!
    race: user.race,
    // "issued at time"
    iat: timestamp
  };
  const options = { expiresIn: '4h' };
  // In here we are going to configure our Token, the way we want to sign it.
  // https://jwt.io/introduction/
  // https://www.npmjs.com/package/jsonwebtoken
  return jwt.sign(payload, secret, options);
}

// passport-local looks for username and password by default ^see docs
// `done` here is kind of like `next`
// this is all 'callback' syntax, versus `promise` syntax (then, catch) or `async`
const localStrategy = new LocalStrategy(function(username, password, done) {
    // console.log('USERNAME+PASSWORD', username, password) -- WORKS! Getting the correct username and password when `Sign In` is clicked
  User.findOne({ username }, function(err, user) {
    if (err) {
      done(err);
    }
    // if username does not exist, it is probably an attacker,
    if (!user) {
      // If I don't find the user, I will assume that we were not able to validate
      // their credentials.
      // null-- as in 'no errors'...???
      done(null, false);
    }
    // If you successfully get into here, then password IS valid, thus the user CAN be authenticated
    user.verifyPassword(password, function(err, isValid) {
      if (err) {
        return done(err);
      }
      if (isValid) {
        const { _id, username, race } = user;
        return done(null, { _id, username, race }); // placed on req.user
      }
      return done(null, false);

      // From passport-local docs -- notice .use is combined while we split it up above, then pass into as a variable
      // passport.use(new LocalStrategy(
      //     function(username, password, done) {
      //       User.findOne({ username: username }, function (err, user) {
      //         if (err) { return done(err); }
      //         if (!user) { return done(null, false); }
      //         if (!user.verifyPassword(password)) { return done(null, false); }
      //         return done(null, user);
      //       });
      //     }
      //   ));
    });
  });
});

const jwtOptions = {
  // This is an industry standard
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // remember that we encrypted using the secret, and now we decrypt it using the secret
  // solved `TypeError: JwtStrategy requires a secret or key` by reading passport-jwt docs
  // finding that this option is not `secret`, but `secretOrKey`
  secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    // use select() to pass ONLY username and race NOT password,
    // .select('-password') also works, and is prob a bit better
    .select('username race')
    .then(user => {
      // In the real world, you would do a lot more checks here -- making sure the user was in
      // the correct department, had the correct clearance, was still an active employee etc.
      if (user) {
        // if I am in here then I have found the user, everything is fine,
        // the token is good, nobody tampered with it
        // "passing null because there is no error"
        done(null, user);
      } else {
        // if I am here, that tells us that the user does not exist/is no longer there, even
        // though we HAVE already verified that the token is valid.
        // So we call a done() here, there is no error (e.g. "null"), but the program is not
        // allowed to proceed (e.g. "false")
        done(null, false);
      }
    })
    .catch(err => {
      // handle
      return done(err, false);
    });
});

// use strategies
passport.use(localStrategy);
passport.use(jwtStrategy);

// generate the passport middleware
// passport by default uses sessions, so you need to turn them off.  We are going to use jwt
const authenticate = passport.authenticate('local', { session: false }); // see passport docs `Authenticate Requests`
// wrote this after finishing jwtStrategy, "this protects the routes"
// QUESTION: So this looks for any code with 'jwt' and runs it???
const protected = passport.authenticate('jwt', { session: false });

module.exports = function(server) {
  // To check this you must have at least one user with "race": "hobbit" registered using [post] / register.
  // Then go to the URL below in Postman and instead of going to Body, click on header and create a new
  // key value pair where key = Authorization, and the value = "Bear <token>"
  server.get('/api/hobbits', protected, (req, res) => {
    // if you are here, you will receive a list of the hobbits
    User.find({ race: 'hobbit' })
      .select('-password')
      .then(hobbits => {
        res.json(hobbits);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.post('/api/register', function(req, res) {
    // grabs username and password from Body
    const credentials = req.body;
    // add user to database
    const user = new User(credentials);
    user.save().then(inserted => {
      const token = makeToken(inserted);
      res.status(201).json({ token });
    });
  });

  server.post('/api/login', authenticate, (req, res) => {
    // find user using the creds from the body
    // check the verify password with what we have stored
    // if condition passes, then issue token to user - which will enable them to access resources
    // if we are here, then all of the above has been done, and the user has been authenticated, and so we return them the token
    res.json({ token: makeToken(req.user), user: req.user });
  });
};
