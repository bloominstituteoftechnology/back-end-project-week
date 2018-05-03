const express = require('express');

const PORT = process.env.PORT || 5000;



// ========== MIDDLEWARE ============== //

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send({
    dummyData: [
      {
        title: 'Note Title 1',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        id: 1
      },
      {
        title: 'Note Title 2',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        id: 2
      },
      {
        title: 'Note Title 3',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        id: 3
      },
      {
        title: 'Note Title 4',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        id: 4
      },
      {
        title: 'Note Title 5',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        id: 5
      },
      {
        title: 'Note Title 6',
        text:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        id: 6
      }
    ]
  });
});

server.listen(PORT);
