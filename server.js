const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')

const Note = require('./notes/Note')
const User = require('./users/User')
const Tag = require('./tags/Tag')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const { ExtractJwt } = require('passport-jwt')
const JwtStrategy = require('passport-jwt').Strategy
const secret = 'cesar is cool'

function makeToken (user) {
  // sub: subject (id) who the token is about
  // iat: issued at times

  const timestamp = Date.now()
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  }
  const options = { expiresIn: 60 * 60 * 1000 }
  return jwt.sign(payload, secret, options)
}
// { usernameField: email }
const localStrategy = new LocalStrategy((username, password, done) => {
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
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch(err => {
      return done(err, false)
    })
})
passport.use(localStrategy)
passport.use(jwtStrategy) // new line

const authenticate = passport.authenticate('local', { session: false })
const protectedRoute = passport.authenticate('jwt', { session: false }) // new

const server = express()
server.use(passport.initialize())
server.use(helmet())
server.use(logger('dev'))
server.use(express.json())
server.use(cors())
const uri = 'mongodb://localhost/notesdb'
const options = {
  useNewUrlParser: true
}
// const uri = 'mongodb://cesar:cesar@ds014648.mlab.com:14648/notes-db'
mongoose
  .connect(uri, options)
  .then(() => console.log(`\n=== Mongo Online ===\n`))
  .catch(err => console.log(err))

server.post('/api/login', authenticate, (req, res) => {
  res.json({ token: makeToken(req.user), user: req.user })
})
server.post('/api/register', (req, res) => {
  const credentials = req.body
  const user = new User(credentials)
  user.save().then(inserted => {
    const token = makeToken(inserted)
    res.status(201).json({ token })
  })
})

server.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err))
})

server.get('/', (req, res) => res.json({ msg: `Server Online` }))
// server.get('/cool', (req, res) => res.send(cool()))

server.get('/api/notes', protectedRoute, (req, res) => {
  Note.find({ username: req.user.username })
    .select('title content _id username tags created')
    // .select()
    .then(notes => {
      res.status(200).json({ notes: notes, username: req.user.username })
    })
    .catch(err => res.status(500).json(err))
})
server.post('/api/notes', protectedRoute, (req, res) => {
  console.log('IN SERVER POST /api notes: ')
  const { username, _id } = req.user
  const { title, content, tags } = req.body
  const newNote = { title, content, username, users: _id, tags: tags }
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
server.delete('/api/notes/:id', protectedRoute, (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(note => {
      Note.find({ username: req.user.username }).then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json(err))
})

server.put('/api/notes/:id', protectedRoute, (req, res) => {
  const { title, content, tags } = req.body
  Note.findByIdAndUpdate(req.params.id, { title, content, tags })
    .then(note => {
      Note.find({ username: req.user.username }).then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json(err))
})

server.post('/api/tags', protectedRoute, (req, res) => {
  const { value } = req.body
  const { username, _id } = req.user
  const newTag = {
    value,
    username: username,
    users: _id
  }
  const tag = new Tag(newTag)
  tag
    .save()
    .then(savedTag => {
      Tag.find()
        .then(tags => {
          res.status(201).json(tags)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`\n API running on ${port}`)
})
