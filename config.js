const port = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/lambda-notes';

module.exports = {
  port,
  dbURI
};