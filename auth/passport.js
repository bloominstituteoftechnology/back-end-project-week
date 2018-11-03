module.exports = (passport, db) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db('users')
      .where('id', '=', id)
      .first()
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
};
