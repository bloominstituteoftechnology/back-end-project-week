require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const PORT = process.env.PORT
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('./routers/authRouter')
const postRouter = require('./routers/postRouter');
const bodyParser = require('body-parser');



server.use(
  morgan('tiny'),
  helmet(),
  cors()
)
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use('/api/users',authRouter)
server.use('/api/posts',postRouter)

server.get('/', (req,res) => {
  res.send('server is up')
})

server.listen(PORT, () => {
  console.log(`Server Is Live On Port ${PORT}`)
});
