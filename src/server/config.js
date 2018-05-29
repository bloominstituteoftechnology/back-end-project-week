const mongoUri = 'mongodb+srv://lambda:lambda@cluster0-40ix5.mongodb.net/test?retryWrites=true'
const mongoOptions = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
}

module.exports = {
  mongoUri,
  mongoOptions
}