const { server } = require('./server');
const port = process.env.PORT || 5000;

module.exports = server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});