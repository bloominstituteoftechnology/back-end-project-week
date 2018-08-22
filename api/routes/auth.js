require('dotenv').config()
const server = require('express')()
const jtw = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var Sequelize = require('sequelize')

var sequelize = new Sequelize('localhost_8000', 'root', 'password', {
  host: 'localhost:8000',
  dialect: 'sqlite'
})

var Users = sequelize.define('Users', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING
})

var Notes = sequelize.define('Notes', {
  title: {
    type: Sequelize.STRING
  },
  context: Sequelize.TEXT
})

let Tags = sequelize.define('Tags', {
  value: Sequelize.STRING
})
Users.hasMany(Notes)
Notes.belongsTo(Users)
Notes.hasMany(Tags)
Tags.belongsTo(Notes)
sequelize.sync()

function getToken (user) {
  console.log('IN TOKKEN', user)
  const payload = {
    userId: user.id
  }
  return jtw.sign(payload, process.env.SECRET, {
    expiresIn: '1d'
  })
}

function register (req, res, next) {
  let { password, username } = req.body
  console.log(req.body)
  password = bcrypt.hashSync(password, 10)
  Users.create({
    username: username,
    password: password
  })
    .then((insertedUser) => {
      const token = getToken(insertedUser)
      res.status(201).json({ token: token })
    })
    .catch(next)
}
function login (req, res, next) {
  const credentials = req.body
  Users.findOne({
    where: { username: `${credentials.username}` }
  })
    .then((insertedUser) => {
      console.log('DATAVALUES', insertedUser.dataValues)
      let user = insertedUser.dataValues
      const lol = bcrypt.compareSync(credentials.password, user.password)
      if (lol === true) {
        const token = getToken(user)
        res.status(200).json({ mes: 'Logged In', token })
      } else {
        return res.status(401).json({ error: 'U shall not pass!' })
      }
    })
    .catch(next)
}
function getNotes (req, res, next) {
  const { userId } = req.token
  Notes.findAll({
    where: {
      userId
    },
    include: {
      model: Tags
    }
  }).then((response) => {
    const notes = response.map((Notes) => {
      return Object.assign(
        {},
        {
          id: Notes.dataValues.id,
          user_id: Notes.dataValues.UserId,
          title: Notes.dataValues.title,
          context: Notes.dataValues.context,
          tags: Notes.dataValues.Tags.map((Tag) => {
            return Tag.dataValues.value
          })
        }
      )
    })
    console.log('HERE SHOULD BE ALL USERS NOTES', notes)
    res.status(200).json(notes)
  })
}
function getNote (req, res, next) {
  Notes.findAll({
    where: { id: req.params.id },
    include: { model: Tags }
  }).then((insertedNote) => {
    const note = insertedNote.map((Notes) => {
      return Object.assign(
        {},
        {
          id: Notes.dataValues.id,
          title: Notes.dataValues.title,
          context: Notes.dataValues.context,
          tags: Notes.dataValues.Tags.map((Tag) => {
            return Tag.dataValues.value
          })
        }
      )
    })

    console.log('GET A NOTE', note)
    res.status(200).json(note[0])
  })
}

function newNote (req, res, next) {
  const { userId } = req.token
  const { title, context, tags } = req.body
  if (!tags) {
    Notes.create({
      title: title,
      context: context,
      UserId: userId
    })
  } else {
    Notes.create({
      title: title,
      context: context,
      UserId: userId
    }).then((note) => {
      console.log(tags)
      const tagArray = tags.split(' ')
      tagArray.forEach((tag) => {
        note.createTag({ value: tag })
      })
    })
  }
}

const restricted = (req, res, next) => {
  let token = req.headers.authorization
  console.log('token innn Restricted ,', token)
  if (token) {
    jtw.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log('THERE WAS AN ERROR')
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' })
      }
      console.log('decoded', decodedToken)
      req.token = decodedToken
      next()
    })
  } else {
    console.log('NO HEREEEE')
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }
}

function deleteNote (req, res, next) {
  console.log(req.params)
  Notes.destroy({
    where: {
      id: req.params.id
    }
  }).then((insertedNote) => {
    res.status(200).json(insertedNote)
  })
}

function updateNote (req, res, next) {
  Notes.update(
    {
      title: req.body.title,
      context: req.body.context
    },
    { returning: true, where: { id: req.params.id } }
  ).then((note) => {
    const tags = req.body.tags
    let tagArr = tags.split(' ')
    Tags.destroy({ where: { NoteId: req.params.id } })
    tagArr.forEach((tag) => {
      Tags.create({
        value: tag,
        NoteId: req.params.id
      })
    })
  })
}

server.post('/register', register)
server.post('/login', login)
server.get('/notes', restricted, getNotes)
server.get('/note/:id', getNote)
server.post('/create', restricted, newNote)
server.delete('/delete/:id', deleteNote)
server.put('/edit/:id', updateNote)
module.exports = server
