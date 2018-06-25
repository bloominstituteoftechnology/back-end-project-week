const server = require('express')();
const PORT = process.env.PORT || 5000;

server.get('/', (req, res) => {
  res.status(200).send('Lambda Notes API');
});

server.listen(PORT, () => {
  console.log(`\n*** Listening on port ${PORT} ***\n`);
});