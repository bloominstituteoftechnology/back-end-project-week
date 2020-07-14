const mongoUri = 'mongodb+srv://lambda:lambda@cluster0-40ix5.mongodb.net'
const mongoTestUri = `${mongoUri}/test`
const mongoProdUri = `${mongoUri}/lambda`
const mongoOptions = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
}

const jwtSecret = 'lambda'

module.exports = {
  mongoUri,
  mongoTestUri,
  mongoProdUri,
  mongoOptions,
  jwtSecret
}