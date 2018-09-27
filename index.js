require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const routes = require('./api/routes.js')

server.use(express.json());
server.use(helmet());

var whitelist = ['http://localhost:4000', 'https://frontend-mjk.herokuapp.com/']

server.use(cors({
    credentials: true, 
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
 }));

server.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN Backend server is running."})
})

server.use('/api/', routes);

const PORT = process.env.PORT || 3300; 

server.listen(PORT, () => {console.log(`\n == Server running on ${PORT} ==\n`)});