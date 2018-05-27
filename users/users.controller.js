const server = require("../server")
const User = require("./users.schema")

server.get('/api/users', (req, res) => {
  User
    .find()
    .then(users => {
      return users.length <= 0 ?
        res.status(204).json({ message: 'there are no users is our database' }) :
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json({ error: 'you broke the server. thanks for nothing.' }))
})