module.exports = {
  db: process.env.DATABASE || 'mongodb://localhost:27017/notes',
  port: process.env.PORT || 8888,
  secret: process.env.JSON_SECRET
}