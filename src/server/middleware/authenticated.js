const { getUserForToken } = require('../util')

const authenticated = async (req, res, next) => {
  const token = req.get('token')
  if (token) {
    const user = await getUserForToken(token)
    if (user) {
      req.user = user
      next()      
    } else res.status(404).send({ error: 'Token invalid or expired' })
  } else res.status(400).send({ error: 'Authentication token missing' })
}

module.exports = authenticated