const mongoUri = 'mongodb+srv://lambda:lambda@cluster0-40ix5.mongodb.net/test'
const mongoOptions = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
}

jwtSecret = 'lambda'

module.exports = {
  mongoUri,
  mongoOptions,
  jwtSecret
}