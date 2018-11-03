const { Router } = require('express');
const bcrypt = require('bcrypt');
const camelToSnake = require('../utils/camelToSnake');
const HttpError = require('../utils/HttpError');

const passportInit = require('../auth/local');

function makeRoute(db, passport) {
  const route = Router();
  passportInit(passport, db);

  route.post('/register', (req, res, next) => {
    return bcrypt
      .hash(req.body.password, 12)
      .then((hash) => {
        return db('users')
          .insert({
            username: req.body.username,
            password: hash,
          })
          .returning('*');
      })
      .then((response) => {
        return passport.authenticate('local', (err, user, info) => {
          if (user) {
            return res.status(200).json({ id: user.id });
          }
        })(req, res, next);
      })
      .catch((err) => {
        console.log(err);
        return next(new HttpError(500, 'Database failure'));
      });
  });

  route.post('/logout', (req, res, next) => {
    if (!req.user) {
      return next(new HttpError(401, 'Forbidden: User not authenticated'));
    }
    req.logOut();
    res.status(204).send();
  });

  route.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(new HttpError(500, 'Database error occurred'));
      }
      if (!user) {
        return next(new HttpError(422, 'Login unsuccessful'));
      }
      if (user) {
        req.logIn(user, (err) => {
          if (err) {
            return next(new HttpError(422, 'Login unsuccessful'));
          }
          return res.status(200).json({ message: 'Login successful' });
        });
      }
    })(req, res, next);
  });

  return route;
}

module.exports = makeRoute;
