const User = require('../models').User
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

const localStrategy = new LocalStrategy((username, password, done) => {
  console.log('IN localStrategy', username, password)
  User.findOne({ where: { username: username } })
    .then(user => {
      if (!user) {
        done(null, false)
      }
      bcrypt
        .compare(password, user.password)
        .then(isPasswordValid => {
          if (isPasswordValid) {
            const { id, username } = user
            return done(null, { id, username }) //* placed on req.user
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = localStrategy
