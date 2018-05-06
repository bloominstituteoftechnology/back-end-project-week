const User = require('./model')
const { createToken } = require('../util/auth')

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find().select('-password -__v')
    res.json(users)
  },

  getUser: async (req, res) => {
    const { body: { email, username }, params: { id } } = req
    const _id = id ? id : null
    const users = await User
      .findOne()
      .or([{ _id }, { email }, { username }])
      .select('-password -__v')
    res.json(users)
  },

  register: async ({ body }, res) => {
    const newUser = new User(body)
    let user = await newUser.save()
    const token = createToken(user)
    user = user.getPublicFields()
    res.status(201).json({ ...user, token })
  },

  login: async ({ user }, res) => {
    const token = createToken(user)
    res.json({ ...user, token })
  }
}
