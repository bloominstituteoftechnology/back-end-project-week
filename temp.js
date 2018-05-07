const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')

const Note = require('./notes/Note')
const User = require('./user/User')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const secret = 'no size limit on tokens'
const { ExtractJwt } = require('passport-jwt')
const JwtStrategy = require('passport-jwt').Strategy
function makeToken (user) {
  // sub: subject (id) who the token is about
  // iat: issued at time
  const timestamp = new Date().getTime()
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  }
  const options = { expiresIn: '4h' }
  return jwt.sign(payload, secret, options)
}
// { usernameField: email }
const localStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username }, function (err, user) {
    if (err) {
      done(err)
    }
    if (!user) {
      done(null, false)
    }
    user.verifyPassword(password, function (err, isValid) {
      if (err) {
        return done(err)
      }
      if (isValid) {
        const { _id, username } = user
        return done(null, { _id, username }) // placed on req.user
      }
      return done(null, false)
    })
  })
})
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}
const jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub)
    .select('-password')
    .then(user => {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => {
      return done(err, false)
    })
})
passport.use(localStrategy)
passport.use(jwtStrategy) // new line
const authenticate = passport.authenticate('local', { session: false })
const protectedRoute = passport.authenticate('jwt', { session: false }) // new line
const server = express()
server.use(helmet())
server.use(logger('dev'))
server.use(express.json())
server.use(cors())
const uri = 'mongodb://adfaris:adfaris@ds263639.mlab.com:63639/lambda_notes'
mongoose
  .connect(uri)
  .then(() => console.log(`\n=== Mongo Online ===\n`))
  .catch(err => console.log(err))
server.post('/api/login', authenticate, (req, res) => {
  res.json({ token: makeToken(req.user), user: req.user })
})
server.post('/api/register', function (req, res) {
  const credentials = req.body
  console.log(credentials, 'credentials')
  console.log(req.body, 'req.body')
  const user = new User(credentials)
  user.save().then(inserted => {
    const token = makeToken(inserted)
    res.status(201).json({ token })
  })
})
server.get('/', (req, res) => res.json({ msg: `Server Online` }))
// server.get('/cool', (req, res) => res.send(cool()))
server.get('/api/notes', (req, res) => {
  console.log(req.user, 'req.user')
  Note.find({ username: req.user.username })
    // .select()
    .then(notes => {
      res.status(200).json(notes)
    })
    .catch(err => res.status(500).json(err))
})
server.post('/api/notes', protectedRoute, (req, res) => {
  const { username } = req.user
  const { title, content } = req.body
  const newNote = { title, content, username }
  console.log(req.body, 'req body', newNote, 'New Note')
  const note = new Note(newNote)
  note
    .save()
    .then(msg => {
      Note.find({ username: req.user.username }).then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json(err))
})
server.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(note => {
      Note.find().then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json(err))
})
//     .catch(err => {
//       res.status(500).json(err)
//     })
// })
server.put('/api/notes/:id', (req, res) => {
  const { title, content } = req.body
  console.log(title, content)
  Note.findByIdAndUpdate(req.params.id, { title, content })
    .then(note => {
      Note.find().then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json(err))
})
// .catch(err => {
//   console.log(err)
// })
const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`\n API running on ${port}`)
  // console.log(process.env)
})
