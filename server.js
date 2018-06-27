const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./notes/Note.js')
const User = require('./users/User.js')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = 'line from a movie'
const LocalStrategy = require('passport-local')
const { ExtractJwt } = require('passport-jwt')
const JwtStrategy = require('passport-jwt').Strategy

function makeToken (user) {
  const timestamp = new Date().getTime()
  const payload = { sub: user._id, iat: timestamp, username: user.username }
  const options = { expiresIn: '1h' }
  return jwt.sign(payload, secret, options)
}

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
        return done(null, { _id, username })
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
passport.use(jwtStrategy)
const authenticate = passport.authenticate('local', { session: false })
const protectedRoute = passport.authenticate('jwt', { session: false })

const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())
server.use(cors())
// Connecting to the mlab mongo database
const uri = 'mongodb://adfaris:adfaris1@ds117711.mlab.com:17711/lambdanote'
mongoose
  .connect(uri)
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

// Setting up env variable for port
const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`API running on ${port} `)
})

// Sanity check
server.get('/', (req, res) => res.json({ msg: `Server Online ` }))

// Login to the System
server.post('/api/login', authenticate, (req, res) => {
  res.json({ token: makeToken(req.user), user: req.user })
})
// Register new user
server.post('/api/register', (req, res) => {
  const signupInfo = req.body
  const user = new User(signupInfo)
  user
    .save()
    .then(saved => {
      const token = makeToken(saved)
      res.status(201).json({ token })
    })
    .catch(err => {
      console.log(err)
    })
})
// Get note route
server.get('/api/notes', protectedRoute, (req, res) => {
  Note.find({ username: req.user.username })
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json({ message: err.message }))
})
// create a new note
server.post('/api/notes', protectedRoute, (req, res) => {
  const { _id, username } = req.user
  const userId = _id
  const { title, content } = req.body
  const newNote = { title, content, userId, username }
  const note = new Note(newNote)
  note
    .save()
    .then(msg => {
      Note.find({ username: req.user.username })
        .then(notes => res.status(201).json(notes))
        .catch(err => res.status(500).json({ message: err.message }))
    })
    .catch(err => res.status(500).json({ message: err.message }))
})
// Delete note
server.delete('/api/notes/:id', protectedRoute, (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(note => {
      Note.find({ username: req.user.username })
        .then(notes => res.status(201).json(notes))
        .catch(err => res.status(500).json({ message: err.message }))
    })
    .catch(err => res.status(500).json({ message: err.message }))
})
// Edit notes
server.put('/api/notes/:id', protectedRoute, (req, res) => {
  const { title, content } = req.body
  Note.findByIdAndUpdate(req.params.id, { title, content })
    .then(note => {
      Note.find({ username: req.user.username }).then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json({ message: err.message }))
    .catch(err => res.status(500).json({ message: err.message }))
})
