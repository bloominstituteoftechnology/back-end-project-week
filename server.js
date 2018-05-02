const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

mongoose
  .connect('mongodb://pacManKana:LambdaN0t3s>@ds111050.mlab.com:11050/lambda-notes')
  .then(cnn => {
    console.log('\n=== connected to mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });

const server = express();

server.get('/', (req, res) => {
    res.send({dummyData: [
        {
          title: "Note Title 1",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          id: 1
        },
        {
          title: "Note Title 2",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          id: 2
        },
        {
          title: "Note Title 3",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          id: 3
        },
        {
          title: "Note Title 4",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          id: 4
        },
        {
          title: "Note Title 5",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          id: 5
        },
        {
          title: "Note Title 6",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          id: 6
        }
      ]});
})



server.listen(PORT)