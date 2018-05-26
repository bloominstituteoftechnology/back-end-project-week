const User = require('./model')
const { createToken } = require('../util/auth')

module.exports = {
  delUser: async (req, res) => {
    const { _id } = req.params
    const query = await User.findByIdAndRemove(_id)
    query
      ? res.status(200).json({ message: `${_id} was deleted. `})
      : res.status(404).json({ err: `Couldn't find ${_id}.`})
  },

  getUsers: async (req, res) => {
    const users = await User.find().populate('notes').select('-password -__v')
    res.json(users)
  },

  getUser: async (req, res) => {
    const { body: { email, username }, params: { _id } } = req

    if (!_id && !email && !username)
      return res.status(422).json({ err: 'Please include required parameters.' })

    const users = await User
      .findOne()
      .or([{ _id }, { email }, { username }])
      .populate('notes')
      .select('-password')
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
