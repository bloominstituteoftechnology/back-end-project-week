const User = require('./model')

module.exports = {
  post: async (req, res) => {
    // const { name, username, password } = req.body
    const newUser = new User(req.body)
    const query = await newUser.save()
    res.status(201).json(query)
  },

  login: async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ err: `${username} not found`})
    user.compare(password, (err, valid) => {
      if (valid) {
        console.log(user, valid, err)
        res.json(user)
      } else {
        console.log(user, valid, err)
        res.status(422).json({ err: 'beep' })
      }
    })
  }
}