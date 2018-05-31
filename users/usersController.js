const jwt = require('jsonwebtoken');

const User = require('./User')
const secret = 'show me da wei';

const authenticate = (req, res, next) => {
    const token = req.get('Authorization');
    if(token) {
        jwt.verify(token, mysecret, (err, decoded) => {
            if (err) return res.status(422).json({err});
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({
            error: 'no token provided, must be set on Auth Header'
        });
    }
};


// const passport = require('passport');
// const LocalStrategy = require('passport-local');

// const JwtStrategy = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt');

// const User = require('./User');
// const secret = 'there is a wizard within';

// const localStrategy = new LocalStrategy(function (username, password, done) {
//     User.findOne({ username })
//         .then(user => {
//             if (!user) {
//                 done(null, false);
//             } else {
//                 user
//                     .validatePassword(password)
//                     .then(isValid => {
//                         if (isValid) {
//                             const { _id, username } = user;
//                             return done(null, { _id, username });
//                         } else {
//                             return done(null, false);
//                         }
//                     })
//                     .catch(err => {
//                         return done(err);
//                     });
//             }
//         })
//         .catch(err => done(err));
// });

// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: secret,
// };

// const jwtStrategy = new JwtStrategy(jwtOptions, function (oayload, done) {
//     User.findById(payload.sub)
//         .then(user => {
//             if (user) {
//                 done(null, user)
//             } else {
//                 done(null, false)
//             }
//         })
//         .catch(err => done(err));
// });

// passport.use(localStrategy);
// passport.use(jwtStrategy);

// const passportOptions = { session: false };
// const authenticate = passport.authenticate('local', passportOptions);
// const protected = passport.authenticate('jwt', passportOptions);

// function makeToken(user) {
//     const timestamp = new Date().getTime();
//     const payload = {
//         sub: user._id,
//         iat: timestamp,
//         username: user.username,
//         role: user.role
//     };
//     const options = {
//         expiresIn: '24h'
//     };

//     return jwt.sign(payload, secret, options);
// }

module.exports = {
    routes: function (server) {

        server.post('/register', function (req, res) {
            const {username, password } = req.body;

            const user = new User({ username, password })
            user.save()
                .then(user => {
                    const token = makeToken(user);
                    res.status(201).json({ user, token });
                })
                .catch(err => res.status(500).json(err));
        });


        server.post('/login', authenticate, (req, res) => {
            const {username, password } = req.body;
            User.findOne({ username }, (err, user) => {
                if(err) {
                    res.status(403).json({ error: 'Invalid Username/Password' });
                    return;
                }
                user.validatePassword(password, (nonMatch, hashMatch) => {
                    if(!hashMatch) {
                        res.status(422).json({ error: 'password is wrong'});
                        return;
                    } else {
                        const payload = {
                            username: user.username
                        };
                        const token = jwt.sign(payload, mysecret);
                        res.json({ token });
                    }
                });
            });
        });

    },
    authenticate    
}