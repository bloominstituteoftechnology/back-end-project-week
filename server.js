const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;



// ========== MIDDLEWARE ============== //

const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose
  .connect(
    'mongodb://pacManKana:LambdaN0t3s@ds111050.mlab.com:11050/lambda-notes'
  )
  .then(cnn => {
    console.log('\n=== connected to mLab mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });

app.get('/', (req, res) => {
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

app.listen(PORT);
