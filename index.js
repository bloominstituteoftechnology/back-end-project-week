const express = require('express');
const server = express();
const cors = require('cors');
const PORT = process.env.port || 5000;
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('./routers/authRouter')
const postRouter = require('./routers/postRouter');
require('dotenv').config();



server.use(
  express.json(),
  morgan('tiny'),
  cors()
)
server.use('/api/users',authRouter)
server.use('/api/posts',postRouter)

server.get('/', (req,res) => {
  res.send('server is up')
})

server.listen(PORT, () => {
  console.log(`Server Is Live On Port ${PORT}`)
});
